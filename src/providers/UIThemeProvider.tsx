import {
	type RefObject,
	createContext,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";

interface UIThemeContextValue {
	registerSection: (ref: RefObject<Element | null>, color: string) => void;
	unregisterSection: (ref: RefObject<Element | null>) => void;
	setOverride: (color: string | null) => void;
}

const UIThemeContext = createContext<UIThemeContextValue | null>(null);

export function UIThemeProvider({ children }: { children: React.ReactNode }) {
	const [baseThemeColor, setBaseThemeColor] = useState<string | null>(null);
	const [overrideThemeColor, setOverrideThemeColor] = useState<string | null>(
		null,
	);
	const observerRef = useRef<IntersectionObserver | null>(null);
	const sectionsRef = useRef<Map<Element, string>>(new Map());
	const originalColorsRef = useRef<{
		backgroundColor: string;
		themeColor: string;
	} | null>(null);

	// Store original colors on mount
	useEffect(() => {
		if (!originalColorsRef.current) {
			const metaThemeColor = document.querySelector('meta[name="theme-color"]');
			originalColorsRef.current = {
				backgroundColor:
					window.getComputedStyle(document.body).backgroundColor,
				themeColor: metaThemeColor?.getAttribute("content") || "",
			};
		}
	}, []);

	// Initialize IntersectionObserver
	useEffect(() => {
		observerRef.current = new IntersectionObserver(
			(entries) => {
				// Find all sections that are either intersecting OR above the threshold
				// (meaning we've scrolled past them and should keep their theme)
				const activeSections = entries
					.map((e) => {
						const rect = e.boundingClientRect;
						const viewportHeight = window.innerHeight;
						const threshold = viewportHeight * 0.1; // Match rootMargin -10%

						// Section is active if:
						// 1. It's intersecting (near top of viewport), OR
						// 2. It's above the threshold (we've scrolled past it going down)
						const isAboveThreshold = rect.bottom < threshold;
						const isActive = e.isIntersecting || isAboveThreshold;

						return {
							element: e.target,
							rect,
							isActive,
							isAbove: isAboveThreshold,
						};
					})
					.filter((s) => s.isActive)
					// Sort by position - prioritize the lowest one that's active
					.sort((a, b) => {
						// If both above threshold, use the one furthest down (closest to threshold)
						if (a.isAbove && b.isAbove) {
							return b.rect.bottom - a.rect.bottom;
						}
						// Otherwise prioritize intersecting sections
						return a.rect.top - b.rect.top;
					});

				// Use the color from the active section
				if (activeSections.length > 0) {
					const activeSection = activeSections[0].element;
					const color = sectionsRef.current.get(activeSection);
					if (color) {
						setBaseThemeColor(color);
					}
				} else {
					// No sections active, clear base theme
					setBaseThemeColor(null);
				}
			},
			{
				// Detect when element's top edge is near the top of viewport
				rootMargin: "-10% 0px -89% 0px",
				threshold: 0,
			},
		);

		return () => {
			observerRef.current?.disconnect();
		};
	}, []);

	// Apply active theme color to body and meta tag
	useEffect(() => {
		const activeColor = overrideThemeColor ?? baseThemeColor;

		// Get or create theme-color meta tag
		let metaThemeColor = document.querySelector('meta[name="theme-color"]');
		if (!metaThemeColor) {
			metaThemeColor = document.createElement("meta");
			metaThemeColor.setAttribute("name", "theme-color");
			document.head.appendChild(metaThemeColor);
		}

		if (activeColor) {
			// Apply the active color
			document.body.style.backgroundColor = activeColor;
			metaThemeColor.setAttribute("content", activeColor);
		} else if (originalColorsRef.current) {
			// Restore original colors when no active color
			document.body.style.backgroundColor =
				originalColorsRef.current.backgroundColor;
			metaThemeColor.setAttribute("content", originalColorsRef.current.themeColor);
		}
	}, [baseThemeColor, overrideThemeColor]);

	// Register a section with its theme color
	const registerSection = (ref: RefObject<Element | null>, color: string) => {
		const element = ref.current;
		if (!element || !observerRef.current) return;

		sectionsRef.current.set(element, color);
		observerRef.current.observe(element);
	};

	// Unregister a section
	const unregisterSection = (ref: RefObject<Element | null>) => {
		const element = ref.current;
		if (!element || !observerRef.current) return;

		sectionsRef.current.delete(element);
		observerRef.current.unobserve(element);
	};

	// Set theme override (for mobile nav, etc.)
	const setOverride = (color: string | null) => {
		setOverrideThemeColor(color);
	};

	return (
		<UIThemeContext.Provider
			value={{ registerSection, unregisterSection, setOverride }}
		>
			{children}
		</UIThemeContext.Provider>
	);
}

/**
 * Hook for sections to register their theme color
 * @param ref - React ref to the section element
 * @param color - Theme color for this section (e.g., "#ffffff")
 */
export function useThemeSection(ref: RefObject<Element | null>, color: string) {
	const context = useContext(UIThemeContext);

	useEffect(() => {
		if (!context) {
			console.warn(
				"useThemeSection must be used within UIThemeProvider. Theme color will not be applied.",
			);
			return;
		}

		context.registerSection(ref, color);

		return () => {
			context.unregisterSection(ref);
		};
	}, [context, ref, color]);
}

/**
 * Hook for components that need to override the theme (e.g., mobile nav)
 * @returns setOverride function to set or clear theme override
 */
export function useThemeOverride() {
	const context = useContext(UIThemeContext);

	if (!context) {
		console.warn(
			"useThemeOverride must be used within UIThemeProvider. Theme override will not work.",
		);
		return () => {};
	}

	return context.setOverride;
}

import { useEffect, useState, useRef } from "react";
import Lottie from "lottie-react";

export function NewFeatures() {
	const [animationData, setAnimationData] = useState<unknown>(null);
	const [isInView, setIsInView] = useState(false);
	const [animationKey, setAnimationKey] = useState(0);
	const sectionRef = useRef<HTMLElement>(null);

	useEffect(() => {
		fetch("/images/flock.json")
			.then((res) => res.json())
			.then((data) => setAnimationData(data));
	}, []);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setIsInView(true);
						setAnimationKey((prev) => prev + 1);
					} else {
						setIsInView(false);
					}
				});
			},
			{ threshold: 0.1 },
		);

		if (sectionRef.current) {
			observer.observe(sectionRef.current);
		}

		return () => observer.disconnect();
	}, [mounted]);

	return (
		<section
			ref={sectionRef}
			id="features"
			className="relative md:overflow-hidden"
			style={{
				backgroundColor: "#C7EBFE",
				overflowX: "hidden",
				overflowY: "hidden",
			}}
			aria-label="Features section"
		>
			{/* Cloud Large - Desktop at top, Mobile at bottom */}
			{/* Desktop version - at top */}
			<div
				className="pointer-events-none absolute top-0 left-0 right-0 z-10 w-full hidden md:block"
				aria-hidden="true"
				style={{
					overflow: "hidden",
				}}
			>
				<img
					src="/images/cloud-lrg.svg"
					alt=""
					className="w-full"
					style={{ display: "block", width: "100%", height: "auto" }}
				/>
			</div>
			{/* Mobile version - at top (bottom of hero section) */}
			<div
				data-mobile-cloud
				className="pointer-events-none absolute top-[80px] left-1/2 -translate-x-1/2 z-[1] block md:hidden"
				aria-hidden="true"
			>
				<img
					src="/images/cloud-lrg.svg"
					alt=""
					style={{ display: "block", width: "220vw", maxWidth: "none" }}
				/>
			</div>
			{/* Flying Flock Animation */}
			{animationData && isInView && (
				<div
					key={`flock-${animationKey}`}
					className="pointer-events-none absolute left-0 top-[10px] z-40 w-[317px]"
					style={{
						animation: "flyAcross 25s linear infinite",
					}}
					aria-hidden="true"
				>
					<Lottie
						animationData={animationData}
						loop
						autoplay
						style={{ width: 317, height: "auto" }}
					/>
				</div>
			)}

			{/* Flying Plane Animation - Right to Left */}
			{isInView && (
				<div
					key={`plane-${animationKey}`}
					className="pointer-events-none absolute top-[280px] md:top-[180px] z-[50] md:z-[5]"
					style={{
						animation: "flyAcrossReverse 25s linear infinite",
						animationDelay: "-3s",
					}}
					aria-hidden="true"
				>
					<img
						src="/images/plane.svg"
						alt=""
						style={{ width: 200, height: "auto" }}
					/>
				</div>
			)}

			{/* Content goes here */}
			<div className="relative z-20 pt-[400px] pb-24">
				{/* Features content will go here */}
			</div>

			{/* Footer content in white space */}
			<div
				data-footer-content
				className="relative z-10 bg-white pt-8 pb-12"
			>
				{/* Smooth gradient overlay at top to blend cloud into footer */}
				<div
					data-gradient-overlay
					className="absolute -top-[150px] left-0 right-0 h-[150px] pointer-events-none z-0"
					style={{
						background:
							"linear-gradient(to bottom, transparent 0%, rgba(255, 255, 255, 0.3) 20%, rgba(255, 255, 255, 0.6) 40%, rgba(255, 255, 255, 0.85) 60%, rgba(255, 255, 255, 0.95) 80%, #FFFFFF 100%)",
					}}
				/>
				<div className="max-w-7xl mx-auto px-8">
					<div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
						{/* Brand Column */}
						<div className="col-span-1 md:col-span-2">
							<div className="flex items-center gap-3 mb-4">
								<div
									className="flex h-10 w-10 items-center justify-center rounded-[4px]"
									style={{ backgroundColor: "#1B1D1E" }}
								>
									<img
										src="/images/logo.svg"
										alt="Lucas Logo"
										width={16}
										height={22}
										className="object-contain"
									/>
								</div>
								<img
									src="/images/lucas-text.svg"
									alt="Lucas"
									className="h-5 w-auto object-contain"
								/>
							</div>
							<p className="text-sm text-gray-600 max-w-md">
								Your AI study companion in iMessage. Automating school tasks and helping
								students succeed.
							</p>
						</div>

						{/* Links Column */}
						<div>
							<h4
								className="text-sm font-semibold mb-4 uppercase tracking-wider"
								style={{ fontFamily: "'HW Cigar', serif" }}
							>
								Product
							</h4>
							<ul className="space-y-3">
								<li>
									<a
										href="#features"
										className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
									>
										Features
									</a>
								</li>
								<li>
									<a
										href="#pricing"
										className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
									>
										Pricing
									</a>
								</li>
								<li>
									<a
										href="#about"
										className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
									>
										About
									</a>
								</li>
							</ul>
						</div>

						{/* Legal Column */}
						<div>
							<h4
								className="text-sm font-semibold mb-4 uppercase tracking-wider"
								style={{ fontFamily: "'HW Cigar', serif" }}
							>
								Legal
							</h4>
							<ul className="space-y-3">
								<li>
									<a
										href="#privacy"
										className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
									>
										Privacy Policy
									</a>
								</li>
								<li>
									<a
										href="#terms"
										className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
									>
										Terms of Service
									</a>
								</li>
								<li>
									<a
										href="#contact"
										className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
									>
										Contact
									</a>
								</li>
							</ul>
						</div>
					</div>

					{/* Bottom Bar */}
					<div className="pt-6 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
						<p
							className="text-sm text-gray-600"
							style={{ fontFamily: "'HW Cigar', serif", fontWeight: 500 }}
						>
							© Lucas {new Date().getFullYear()}
						</p>
						<div className="flex items-center gap-5">
							<a
								href="https://twitter.com"
								target="_blank"
								rel="noopener noreferrer"
								className="text-gray-400 transition-colors duration-200 hover:text-gray-900"
								aria-label="Twitter"
							>
								<svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
									<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
								</svg>
							</a>
							<a
								href="https://instagram.com"
								target="_blank"
								rel="noopener noreferrer"
								className="text-gray-400 transition-colors duration-200 hover:text-gray-900"
								aria-label="Instagram"
							>
								<svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
									<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
								</svg>
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}


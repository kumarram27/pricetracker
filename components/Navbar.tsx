import Image from "next/image"
import Link from "next/link"

const navIcons = [
  {
    src: "/assets/icons/search.svg",
    alt: "Search",
  },
  {
    src: "/assets/icons/black-heart.svg",
    alt: "Heart",
  },
  {
    src: "/assets/icons/user.svg",
    alt: "User",
  },
];

const Navbar = () => {
  return (
    <header className="w-full">
        <nav className="nav">
            <Link href="/" className="flex items-center gap-1">
                <Image src="/assets/icons/logo.svg" alt="PriceTracker" width={30} height={30} />
                <p className="nav-logo">Price<span className="text-primary">Tracker</span></p>
            </Link>
            <div className="flex items-center gap-5">
                {navIcons.map((icon) => (
                <Image
                    key={icon.alt}
                    src={icon.src}
                    alt={icon.alt}
                    width={30}
                    height={30}
                    className="object-contain"
                />
                ))}
            </div>
        </nav>
    </header>
  )
}
export default Navbar
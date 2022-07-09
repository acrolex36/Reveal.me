import Logo from "../images/Logo.png";

const Header = () => {
    return (
        <div className="flex flex-row bg-darker-pink">
            <img
                className="w-24 my-3 mr-0"
                src={Logo}
                alt="Logo"
            />
            <a href="/" className="my-auto btn btn-ghost normal-case font-mono text-2xl">Reveal.Me</a>
        </div>
    );
};
export default Header;

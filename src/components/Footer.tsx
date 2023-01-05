import AllStats from "./AllStats";

const Footer = () => {
  return (
    <div className="font-medium flex items-center justify-between flex-wrap py-4 lg:px-20 px-2 flex-col gap-2 lg:flex-row">
      <div>
        Made with ❤️ and 🙏 by <span>
          <a 
            href="https://basokant.com/"
            className="underline text-cyan-800 hover:text-cyan-700 transition-colors"
            target="_blank"
            rel="noreferrer noopener"
          >
            Ben Asokanthan
          </a>
        </span>
      </div>
      <AllStats />
    </div>
  );
}

export default Footer;
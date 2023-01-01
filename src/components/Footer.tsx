import AllStats from "./AllStats";

const Footer = () => {
  return (
    <div className="font-medium flex items-center justify-between flex-wrap bg-lightCyan p-4 flex-col gap-2 lg:flex-row">
      <div>
        Made with ❤️ and 🙏 by <span>
          <a 
            href="https://basokant.com/"
            className="underline text-blue hover:text-turquise transition-colors"
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
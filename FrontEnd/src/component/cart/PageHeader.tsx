import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

type PageHeaderProps = {
  title: string;
  backLink?: string;
  backText?: string;
  rightText?: string;
};

const PageHeader = ({
  title,
  backLink = "/",
  backText = "Back",
  rightText,
}: PageHeaderProps) => {
  return (
    <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between max-w-5xl px-4 py-3 mx-auto">
        <Link
          to={backLink}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {backText}
        </Link>

        <span className="text-sm font-semibold tracking-wide text-gray-700 uppercase">
          {title}
        </span>

        <span className="text-sm text-gray-400">
          {rightText}
        </span>
      </div>
    </div>
  );
};

export default PageHeader;
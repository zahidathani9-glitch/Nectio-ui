export default function LegalLinks() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-gray-400">
      <a href="/privacy" className="transition-colors duration-200 hover:text-white">
        Privacy
      </a>
      <a href="/terms-of-service" className="transition-colors duration-200 hover:text-white">
        Terms of Service
      </a>
      <a href="/terms-of-use" className="transition-colors duration-200 hover:text-white">
        Terms of Use
      </a>
    </div>
  );
}
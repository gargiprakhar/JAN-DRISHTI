import React, { useState } from 'react';
import { Download, Smartphone, X } from 'lucide-react';
import { usePWAInstall } from '../../hooks/usePWAInstall';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // Suppress if already running in standalone PWA mode
  if (isInstalled) {
    return null;
  }

  // Chromium / Android / Desktop flow
  if (isInstallable) {
    return (
      <button
        id="pwa-install-btn"
        onClick={install}
        className="flex items-center gap-2 rounded-lg bg-[#C08A2E] hover:bg-[#A97424] text-[#0F291E] font-medium px-3.5 py-1.5 text-xs transition shadow-sm cursor-pointer"
        title="Install Jan Drishti App on your device"
      >
        <Download className="w-3.5 h-3.5" />
        <span>Install App</span>
      </button>
    );
  }

  // iOS Safari flow
  if (isIOS) {
    return (
      <>
        <button
          id="pwa-ios-install-btn"
          onClick={() => setShowIOSGuide(true)}
          className="flex items-center gap-2 rounded-lg border border-[#C08A2E]/40 text-[#C08A2E] hover:bg-[#C08A2E]/10 px-3 py-1.5 text-xs font-medium transition cursor-pointer"
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Install PWA</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
            <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-2xl border border-[#D6E3DC] text-[#14261C]">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <h3 className="text-base font-semibold text-[#1B4332]">Install Jan Drishti on iOS</h3>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-gray-600">
                To install Jan Drishti on your iPhone or iPad:
              </p>
              <ol className="mt-2 text-xs space-y-2 text-gray-700 list-decimal list-inside bg-[#F5F8F6] p-3 rounded-lg border border-[#E1ECE5]">
                <li>Tap the <strong>Share</strong> icon (square with arrow) at the bottom of Safari.</li>
                <li>Scroll down and tap <strong>Add to Home Screen</strong>.</li>
                <li>Tap <strong>Add</strong> in the top-right corner.</li>
              </ol>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-4 w-full rounded-lg bg-[#1B4332] py-2 text-xs font-medium text-white hover:bg-[#143427] transition"
              >
                Understood
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};

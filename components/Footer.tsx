"use client"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white py-6 px-8 border-t border-purple-400/30 shadow-xl">
      <style>{`
        @keyframes heartbeat {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.2);
          }
        }

        @keyframes glow {
          0%, 100% {
            text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
          }
          50% {
            text-shadow: 0 0 20px rgba(255, 255, 255, 0.8), 0 0 30px rgba(255, 59, 48, 0.6);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-2px);
          }
        }

        .heart-beat {
          animation: heartbeat 1.5s ease-in-out infinite;
          display: inline-block;
        }

        .footer-text {
          animation: glow 3s ease-in-out infinite;
        }

        .footer-container:hover {
          animation: float 2s ease-in-out infinite;
        }
      `}</style>

      <div className="max-w-6xl mx-auto flex items-center justify-center gap-3 footer-container">
        <span className="text-lg font-semibold footer-text">Created with</span>
        <span className="heart-beat text-2xl">♥️</span>
        <span className="text-lg font-semibold footer-text">by</span>
        <a
          href="https://github.com/Sourav-project"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-xl bg-white/20 px-3 py-1 rounded-lg transition-all duration-300 hover:bg-white hover:text-blue-600 hover:shadow-lg hover:scale-105"
        >
          Sourav
        </a>
      </div>
    </footer>
  )
}

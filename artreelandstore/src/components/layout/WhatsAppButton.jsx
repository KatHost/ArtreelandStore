const whatsappNumber = "27791043081";
const message = encodeURIComponent("Hi ARTRƎELAND, I have a question.");

export default function WhatsAppButton() {
    return (
        <a
            className="whatsapp-float"
            href={`https://wa.me/${whatsappNumber}?text=${message}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with ARTRƎELAND on WhatsApp"
            title="Chat with us on WhatsApp"
        >
            <svg
                viewBox="0 0 32 32"
                aria-hidden="true"
                focusable="false"
            >
                <path
                    fill="currentColor"
                    d="M16.02 3.2a12.62 12.62 0 0 0-10.8 19.15L3.5 28.8l6.6-1.73A12.6 12.6 0 1 0 16.02 3.2Zm0 22.9c-1.9 0-3.76-.51-5.4-1.48l-.39-.23-3.92 1.03 1.05-3.82-.26-.4a10.25 10.25 0 1 1 8.92 4.9Zm5.63-7.68c-.31-.16-1.83-.9-2.12-1-.29-.11-.5-.16-.71.16-.21.31-.81 1-1 1.2-.18.21-.36.24-.67.08-.31-.15-1.32-.49-2.52-1.56-.94-.83-1.57-1.85-1.75-2.16-.18-.31-.02-.48.14-.64.14-.14.31-.36.47-.54.16-.18.21-.31.31-.52.1-.2.05-.39-.03-.54-.08-.16-.71-1.72-.97-2.36-.25-.62-.51-.53-.7-.54h-.6c-.21 0-.55.08-.83.39-.29.31-1.09 1.06-1.09 2.59s1.12 3 1.27 3.21c.16.21 2.2 3.36 5.33 4.71.74.32 1.32.51 1.77.65.74.23 1.42.2 1.95.12.6-.09 1.83-.75 2.09-1.48.26-.72.26-1.34.18-1.47-.08-.13-.29-.21-.6-.36Z"
                />
            </svg>
        </a>
    );
}

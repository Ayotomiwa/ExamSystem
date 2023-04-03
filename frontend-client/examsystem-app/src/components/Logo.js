import { useRef } from "react";
import "./Logo.css";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const Logo = () => {
    const h1Ref = useRef(null);
    let interval = null;

    const handleMouseOver = () => {
        let iteration = 0;

        clearInterval(interval);

        interval = setInterval(() => {
            if (!h1Ref.current) {
                clearInterval(interval);
                return;
            }

            h1Ref.current.innerText = h1Ref.current.innerText
                .split("")
                .map((letter, index) => {
                    if (index < iteration) {
                        return h1Ref.current.dataset.value[index];
                    }

                    return letters[Math.floor(Math.random() * 26)];
                })
                .join("");

            if (iteration >= h1Ref.current.dataset.value.length) {
                clearInterval(interval);
            }

            iteration += 1 / 3;
        }, 30);
    };

    return (
        <div className="page">
            <h1
                className="heading"
                ref={h1Ref}
                onMouseOver={handleMouseOver}
                data-value="LSBU:EXAM:TIMER"
            >
                LSBU EXAM TIMER
            </h1>
        </div>
    );
};

export default Logo;

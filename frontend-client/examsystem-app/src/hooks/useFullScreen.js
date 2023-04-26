import { useState, useEffect } from 'react';

export default function useFullScreen() {
    const [isFullScreen, setIsFullScreen] = useState(false);

    useEffect(() => {
        const handleFullScreenChange = () => {
            setIsFullScreen(document.fullscreenElement !== null);
        };

        document.addEventListener('fullscreenchange', handleFullScreenChange);
        return () => {
            document.removeEventListener('fullscreenchange', handleFullScreenChange);
        };
    }, []);

    const enterFullScreen = (element) => {
        if (!element) return;

        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.webkitRequestFullscreen) { // Safari
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) { // IE11
            element.msRequestFullscreen();
        }
    };

    const exitFullScreen = () => {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { // Safari
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { // IE11
            document.msExitFullscreen();
        }
    };

    const toggleFullScreen = (element) => {
        if (isFullScreen) {
            exitFullScreen();
        } else {
            enterFullScreen(element);
        }
    };

    return [isFullScreen, toggleFullScreen];
}

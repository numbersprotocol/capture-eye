import { css } from 'lit';

export function getCaptureEyeStyles() {
  return css`
    :host {
      display: block;
      font-family: 'Degular-Medium', Helvetica;
      --capture-eye-container-flex: 0 1 auto;
      --capture-eye-container-display: flex;
    }

    .capture-eye-container {
      position: relative;
      display: var(--capture-eye-container-display);
      flex: var(--capture-eye-container-flex);
    }

    .capture-eye-button {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 100;
      width: 2rem;
      height: 2rem;
      cursor: pointer;
      border-radius: 100vw;
      opacity: 0.4;
      display: none; /* Hidden by default */
    }
    .capture-eye-button:hover {
      opacity: 1;
    }
    :host(:hover) .capture-eye-button,
    .capture-eye-button.active {
      display: flex; /* Show button on hover or when active */
    }

    @media (min-width: 401px) {
      .capture-eye-button:hover::before {
        max-width: 170px;
        /* Adjust to your desired maximum width */
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        content: 'Click me!';
        position: absolute;
        left: 220%;
        /* Adjust as needed */
        transform: translateX(-50%);
        padding: 5px 10px;
        background-color: #fff;
        /* Background color of the popup */
        color: #333;
        /* Text color */
        opacity: 0.7;
        border-radius: 5px;
        font-size: 12px;
        z-index: 1;
        /* To make sure it stays on top */
        pointer-events: none;
        /* Ensure it doesn't interfere with other interactions */
        font-family: 'Degular-Medium', Helvetica;
      }
    }

    .capture-eye-no-scroll {
      overflow: hidden;
    }
  `;
}

import { css } from 'lit';

export function getCaptureEyeStyles() {
  return css`
    :host {
      display: block;
      font-family: 'Degular-Medium', Helvetica;
      --capture-eye-container-display: inline-block;
    }

    ::slotted(*) {
      display: block;
    }

    .capture-eye-container {
      position: relative;
      display: var(--capture-eye-container-display);
      vertical-align: bottom;
    }

    .capture-eye-button {
      position: absolute;
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
    .capture-eye-button.position-top {
      top: 0;
      margin-top: 5px;
    }
    .capture-eye-button.position-bottom {
      bottom: 0;
      margin-bottom: 5px;
    }
    .capture-eye-button.position-left {
      left: 0;
      margin-left: 5px;
    }
    .capture-eye-button.position-right {
      right: 0;
      margin-right: 5px;
    }
    .capture-eye-button:hover {
      opacity: 1;
    }
    :host(:hover) .capture-eye-button,
    .capture-eye-button.active {
      display: flex; /* Show button on hover or when active */
    }

    .capture-eye-button.full-visibility {
      opacity: 1;
      display: flex;
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
        /* Adjust as needed */
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
      .capture-eye-button.position-left:hover::before {
        left: 220%;
        transform: translateX(-50%);
      }
      .capture-eye-button.position-right:hover::before {
        right: 220%;
        transform: translateX(50%);
      }
    }

    .capture-eye-no-scroll {
      overflow: hidden;
    }
  `;
}

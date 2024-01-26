import { css } from 'lit';

export function getStyles() {
  return css`
    :host {
      font-family: 'Degular-Medium', Helvetica;
    }

    .capture-eye-container {
      position: relative;
    }

    .capture-eye-button {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1;
      width: 2rem;
      height: 2rem;
      cursor: pointer;
      border-radius: 100vw;
      opacity: 0.4;
    }
    .capture-eye-button:hover {
      opacity: 1;
    }

    .capture-eye-iframe {
      border: none;
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

    /* Modal styles */
    .modal {
      // display: none; /* Hidden by default */
      position: fixed; /* Stay in place */
      z-index: 2; /* Sit on top */
      left: 0;
      top: 0;
      width: 100%; /* Full width */
      height: 100%; /* Full height */
      overflow: auto; /* Enable scroll if needed */
      background: rgb(0, 0, 0); /* Fallback color */
      background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
    }

    .modal-container {
      background-color: #fefefe;
      border-radius: 1rem;
      margin: 48px auto; /* 15% from the top and centered */
      width: 80%; /* Could be more or less, depending on screen size */
      height: 80%; /* Could be more or less, depending on screen size */
      background: #111112;
    }

    .modal-header {
      display: flex;
      height: 90px;
      align-items: center;
      border-bottom: 1px solid #383838;
    }

    .keyboard-arrow-left {
      display: inline-flex;
      align-items: flex-start;
      gap: 8px;
      padding: 4px;
      background-color: #383838;
      border-radius: 32px;
      margin-left: 40px;
    }

    @media (max-width: 600px) {
      .keyboard-arrow-left {
        margin-left: 20px;
      }
    }

    .keyboard-arrow-left .close {
      position: relative;
      width: 24px;
      height: 24px;
    }

    .modal-content {
      display: flex;
      width: 100%;
      height: 100%;
      justify-content: center;
    }
  `;
}

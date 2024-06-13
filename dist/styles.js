import { css } from 'lit';
export function getStyles() {
    return css `
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
      z-index: 100;
      width: 2rem;
      height: 2rem;
      cursor: pointer;
      border-radius: 100vw;
      opacity: 0.4;
    }
    .capture-eye-button:hover {
      opacity: 1;
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
      z-index: 1000;
      background: rgba(0, 0, 0, 0.4);
      display: flex;
      justify-content: flex-start; /* Align to the left */
      align-items: flex-start; /* Align to the top */
    }

    .modal-container {
      background-color: #fff;
      border-radius: 1rem;
      width: 20rem; /* Thinner width */
      padding: 1rem;
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
      position: relative;
    }

    .modal-hidden {
      display: none;
    }

    .modal-header {
      display: flex;
      justify-content: flex-end;
    }

    .close-button {
      cursor: pointer;
      background-color: #486cd9;
      width: 2rem; /* Adjust size as needed */
      height: 2rem; /* Ensure width and height are equal */
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .close-button img {
      width: 1.5rem;
      height: 1.5rem;
    }

    .modal-content {
      margin-top: 1rem;
    }

    .card {
      border-radius: 1rem;
      overflow: hidden;
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
      background-color: #f0f0f0;
    }

    .group-title {
      text-transform: uppercase;
      color: #333;
    }

    .profile-container {
      display: flex;
      align-items: center;
      padding: 1rem;
    }

    .profile-img {
      border-radius: 50%;
      width: 4rem;
      height: 4rem;
      margin-right: 1rem;
    }

    .profile-text {
      flex: 1;
    }

    .card-body {
      padding: 1rem;
    }

    .caption {
      font-size: 1rem;
      color: #333;
      margin-bottom: 1rem;
    }

    .origins {
      margin-bottom: 1rem;
    }

    .origins h3 {
      margin: 0;
      font-size: 1rem;
      color: #000;
      margin-bottom: 0.5rem;
    }

    .origins p {
      margin: 0;
      font-size: 0.875rem;
      color: #888;
    }

    .view-more-btn {
      display: inline-block;
      background-color: #486cd9;
      width: 100%;
      color: #fff;
      font-size: 0.875rem;
      font-weight: 600;
      text-transform: uppercase;
      padding: 0.5rem 2rem;
      border-radius: 100vw;
      text-align: center;
      transition: background-color 0.3s ease;
      border: none;
      cursor: pointer;
    }

    .view-more-btn:hover {
      background-color: #6ebff2;
    }

    .card-footer {
      background-color: #f0f0f0;
      padding: 1rem;
      text-align: right;
      font-size: 0.875rem;
      color: #888;
    }
  `;
}
//# sourceMappingURL=styles.js.map
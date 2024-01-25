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

    .modal-content section {
      flex: 1; /* Each section takes equal width */
      aspect-ratio: 1; /* Maintain aspect ratio of 1 */
      color: white;
    }

    section.preview-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex: 1;
      min-width: 200px;
      margin: 40px;
    }

    section.preview-container img {
      border-radius: 8px;
      overflow: hidden;
    }

    section.preview-container #ipfs-no-preview-available-text {
      background-color: #212121;
      border-radius: 8px;
      width: 100%;
      aspect-ratio: 1;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-family: 'Degular-Medium', Helvetica;
      font-weight: 400;
      color: #ffffff5a;
      letter-spacing: 0;
      line-height: normal;
    }

    @media (max-width: 600px) {
      section.preview-container {
        margin: 24px;
      }
    }

    section.preview-container .preview-image {
      width: 100%;
      aspect-ratio: 1;
      object-fit: contain;
    }

    section.preview-container .preview-video {
      width: 100%;
      aspect-ratio: 1;
      object-fit: contain;
    }

    section.metadata-container {
      border: 1px solid #383838;
      border-top: none;
    }

    @media (max-width: 1200px) {
      section.metadata-container {
        border: none;
        border-top: 1px solid #383838;
      }
    }

    .heading {
      display: flex;
      /* width: 100%; */
      align-items: center;
      justify-content: space-between;
      padding: 12px 40px;

      border-bottom-width: 1px;
      border-bottom-style: solid;
      border-color: #333333;
    }

    .metadata-container {
      display: flex;
      flex-direction: column;
      width: 100%;
      position: relative;
      font-family: 'Degular-Medium', Helvetica;
      font-weight: 500;
      color: #ffffff;
      font-size: 16px;
      letter-spacing: 0;
      line-height: 24px;
      white-space: nowrap;
    }

    .metadata-container .keyboard-arrow-up {
      position: relative;
      width: 24px;
      height: 24px;
      margin-top: -6937px;
      margin-left: -86152px;
    }

    .metadata-container .table {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
      padding: 20px 40px 24px;
    }

    .metadata-container-bottom-spacer {
      height: 48px;
    }
    @media (min-width: 1200px) {
      .metadata-container-bottom-spacer {
        height: 145px;
        width: 100%;
      }
    }

    .metadata-container .link {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 13px 32px;
      margin-left: 40px;
      margin-right: 40px;

      background-color: #5ce6a8;
      border-radius: 43px;
      overflow: hidden;
    }

    @media (min-width: 1200px) {
      .link {
        align-self: flex-end;
      }
    }

    .link:hover,
    .link *:hover {
      cursor: pointer;
    }

    .link .purchase-license {
      width: fit-content;
      font-family: 'Degular-Medium', Helvetica;
      font-weight: 500;
      color: #000000;
      font-size: 15px;
      text-align: center;
      letter-spacing: 0.3px;
      line-height: normal;
    }

    .link {
      margin: 24px 40px;
    }

    @media (max-width: 600px) {
      .link {
        margin: 24px 24px;
      }
    }

    .metadata-container .row {
      display: flex;
      align-items: flex-start;
      gap: 4px;
      align-self: stretch;
      width: 100%;
      flex: 0 0 auto;
    }

    .metadata-container .key-column {
      flex: 0 0 30%; /* 30% of the parent container's width */
      max-width: 202px;
      position: relative;
      margin-top: -1px;
      opacity: 0.5;
      color: #fff;
      font-family: 'Degular-Medium', Helvetica;
      font-weight: 400;
      font-size: 14px;
      letter-spacing: 0;
      line-height: normal;
    }

    @media (max-width: 600px) {
      .metadata-container .key-column {
        flex: 0 0 35%; /* 30% of the parent container's width */
      }
    }

    .metadata-container .value-column {
      max-width: 430px;
      white-space: nowrap; /* Keep the text on the same line */
      overflow: hidden; /* Hide the overflow text */
      text-overflow: ellipsis; /* Show an ellipsis when text overflows */
      display: flex;
      align-items: center;
      gap: 4px;
      position: relative;
      flex: 1;
      flex-grow: 1;
      margin-top: -0.5px;
      color: #fff;
      width: 100%;
      font-family: 'Degular-Medium', Helvetica;
      font-weight: 400;
      font-size: 14px;
      letter-spacing: 0;
      line-height: normal;
    }

    .metadata-container .value-column a {
      color: #5ce6a8;
    }

    .metadata-container .value-column .highlight-color {
      color: #5ce6a8;
    }

    .metadata-container .img {
      position: relative;
      width: 20px;
      height: 20px;
    }

    .metadata-container .purchase-license-wrapper {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 13px 32px;
      /* position: absolute; */
      top: 21px;
      left: 1205px;
      background-color: #5ce6a8;
      border-radius: 43px;
      overflow: hidden;
    }

    @-webkit-keyframes fadein {
      from {
        bottom: 0;
        opacity: 0;
      }
      to {
        bottom: 30px;
        opacity: 1;
      }
    }

    @keyframes fadein {
      from {
        bottom: 0;
        opacity: 0;
      }
      to {
        bottom: 30px;
        opacity: 1;
      }
    }

    @-webkit-keyframes fadeout {
      from {
        bottom: 30px;
        opacity: 1;
      }
      to {
        bottom: 0;
        opacity: 0;
      }
    }

    @keyframes fadeout {
      from {
        bottom: 30px;
        opacity: 1;
      }
      to {
        bottom: 0;
        opacity: 0;
      }
    }

    .icon-container {
      position: relative;
      display: inline-block;
    }

    .tooltip {
      visibility: hidden;
      width: 220px;
      padding: 8px;
      background-color: #000;
      font-family: 'Degular-Medium', Helvetica;
      font-weight: 400;
      color: #fff;
      font-size: 12px;
      letter-spacing: 0;
      text-align: center;
      line-height: normal;
      text-align: center;
      border-radius: 5px;
      position: fixed;
      height: fit-content;
      z-index: 9;
      white-space: normal; /* Allows the text to wrap */
      overflow-wrap: break-word; /* Breaks words to prevent overflow */
      overflow: hidden; /* Prevents text from overflowing outside the box */
    }

    .tooltip.show {
      visibility: visible;
      -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
      animation: fadein 0.5s, fadeout 0.5s 2.5s;
    }

    /* Define the shimmer animation */
    @keyframes shimmer {
      0% {
        background-position: -1000px 0;
      }
      100% {
        background-position: 1000px 0;
      }
    }

    /* Apply the shimmer effect to elements with the .shimmer class */
    .shimmer {
      background: linear-gradient(90deg, #3d3939 10%, #d0d0d0 25%, #2d2c2c 40%);
      background-size: 200% 200%;
      animation: shimmer 3s infinite;
      color: transparent !important;
    }

    /* Make all child elements transparent */
    .shimmer * {
      color: transparent !important;
    }

    .grayed-out {
      filter: grayscale(100%);
      /* Add any other styling for grayed-out image here */
    }
  `;
}

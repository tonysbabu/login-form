import React from "react";

export default function LoadingIndicator({ show }) {
  if (show) {
    return (
      <div data-testid="loading-indicator" className="loading-ring-container">
        <div className="loading-ring"></div>
      </div>
    );
  }
  return null;
}

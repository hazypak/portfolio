import { RotateCcw } from "lucide-react";
import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

/** Shows a calm recovery screen; error details go to the console, never the page. */
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[portfolio] render error", error, info.componentStack);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <main className="grid min-h-screen place-items-center bg-ink px-6 text-frost">
        <div className="max-w-md text-center">
          <p className="eyebrow">Something broke</p>
          <h1 className="section-title mt-3">
            This page didn't load properly.
          </h1>
          <p className="mt-4 text-mist">Reload to try again.</p>
          <button
            className="btn btn-primary mt-8"
            onClick={() => window.location.reload()}
            type="button"
          >
            <RotateCcw aria-hidden="true" size={16} /> Reload page
          </button>
        </div>
      </main>
    );
  }
}

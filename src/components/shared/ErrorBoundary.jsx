import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('NA Websites render error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-quartz flex items-center justify-center px-6">
          <div className="max-w-md text-center">
            <p className="text-[10px] uppercase tracking-[0.3em] text-olive/50 mb-4">NA Websites</p>
            <h1 className="font-serif text-2xl text-ink font-light mb-3">Something went wrong.</h1>
            <p className="text-sm text-ink/45 font-light mb-6">Try refreshing the page.</p>
            <a href="/" className="text-[12px] uppercase tracking-[0.15em] text-olive hover:text-ink">
              Back to home
            </a>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

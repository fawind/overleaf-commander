declare global {
  interface Window {
    angular: {
      element: (selector: string) => { scope: () => any },
    },
  }
}

export function withScope<S>(controller: string): S {
  return window.angular.element(`[ng-controller=${controller}]`).scope();
}

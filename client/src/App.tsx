import { Route, Switch } from "wouter";
import ErrorBoundary from "@/components/ErrorBoundary";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";

export default function App() {
  return (
    <ErrorBoundary>
      <Switch>
        <Route component={Home} path="/" />
        <Route component={NotFound} />
      </Switch>
    </ErrorBoundary>
  );
}

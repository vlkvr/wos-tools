import { Switch, Route, Router } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import HealingCalculator from "@/pages/HealingCalculator";
import ArmamentCalculator from "@/pages/ArmamentCalculator";
import OfficerProjectCalculator from "@/pages/OfficerProjectCalculator";
import AllianceShowdownCalculator from "@/pages/AllianceShowdownCalculator";
import KingOfIcefieldCalculator from "@/pages/KingOfIcefieldCalculator";
import StateOfPowerCalculator from "@/pages/StateOfPowerCalculator";
import NotFound from "@/pages/not-found";


function App() {
  return (
    <Router base={import.meta.env.BASE_URL}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <AppRouter />
        </TooltipProvider>
      </ThemeProvider>
    </Router>
  );
}

function AppRouter() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/healing" component={HealingCalculator} />
        <Route path="/armament-competition" component={ArmamentCalculator} />
        <Route path="/officer-project" component={OfficerProjectCalculator} />
        <Route path="/alliance-showdown" component={AllianceShowdownCalculator} />
        <Route path="/king-of-icefield" component={KingOfIcefieldCalculator} />
        <Route path="/state-of-power" component={StateOfPowerCalculator} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

export default App;

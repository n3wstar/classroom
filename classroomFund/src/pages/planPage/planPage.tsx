import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { FloorPlan } from "../../components/plan/FloorPlan";


export const PlanPage = () => {
  return (
    <div className="page">
      <Header />

      <main className="main-planpage">
        <h2>РИ-РТФ</h2>
        <FloorPlan />
      </main>

      <Footer />
    </div>
  );
};
import type { Plan } from "../types/plan.types";

const plans: Plan[] = [];

export const addPlan = (plan: Plan) => {
  plans.push(plan);
};

export const getPlans = () => plans;
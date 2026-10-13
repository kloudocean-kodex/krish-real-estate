import type { Metadata } from "next";
import { RentalAppraisalClient } from "./RentalAppraisalClient";
export const metadata: Metadata = {
  title: "Rental Appraisal in Melbourne North",
  description:
    "Request a personal rental appraisal or discuss property management with the Krish team. Contact rental@krishrealestate.com.au.",
  alternates: { canonical: "/rental-appraisal/" },
};
export default function RentalAppraisalPage() {
  return <RentalAppraisalClient />;
}

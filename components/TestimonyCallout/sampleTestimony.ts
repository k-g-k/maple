import { currentGeneralCourt } from "functions/src/shared"
import { Testimony } from "../db"
import { FeedTestimony } from "./TestimonyFeed"

/**
 * TEST ONLY, NOT TO SHIP. The four testimonies mapletestimony.org's homepage
 * showed, as it showed them (each quote already cut short there), for trying
 * out the homepage's testimony designs with real content. Only the fields the
 * feed and bubbles read are filled, with the bill titles as the site showed
 * them. Each id, which the feeds link the testimony by, is blank; rows with
 * an href link there instead. Nathan Sanders' and Cynthia Marie Feliciano's
 * quotes are in full, the others as the homepage cut them.
 */
const sample = (
  position: Testimony["position"],
  content: string,
  billId: string,
  billTitle: string,
  authorDisplayName: string
) =>
  ({
    id: "",
    authorUid: authorDisplayName,
    billId,
    billTitle,
    court: currentGeneralCourt,
    position,
    content,
    authorDisplayName
  } as Testimony)

export const sampleTestimony: FeedTestimony[] = [
  {
    ...sample(
      "endorse",
      "Dear Members of the Committee on House Ways and Means,\n\nI am writing to express my strong support for H4746, “An Act Establishing the Massachusetts Consumer Data Privacy Act,” and to urge the Committee to advance this legislation before the end of the current session.\n\nMassachusetts residents have waited long enough. The Commonwealth has studied this issue across multiple legislative sessions while other jurisdictions — including California and the European Union — have enacted meaningful, if imperfect, consumer data protections. The gap between what Massachusetts residents deserve and what they currently have is not a reason for further delay; it is a reason for urgency.",
      "H4746",
      "An Act establishing the Massachusetts consumer data privacy act",
      "Nathan Sanders"
    ),
    href: "https://www.mapletestimony.org/testimony/yrnDKstoz1hh0Vqkzj-rV/1"
  },
  {
    ...sample(
      "endorse",
      "Good Afternoon, My name is Cynthia Feliciano, resident of Holyoke, a former SNAP and HIP user, a food grower and a passionate resident of food access. I am beyond grateful for your support, efforts to help cross this bill to the finish line. The commitment and investment in local food, farmland, and food security will help advance health outcomes, access to healthy foods, engagement in local farmland and create delicious, culturally relevant foods for families and others. Thank you and look forward to more engagement and support of food access, farmland and nutritious foods! Sincerely, Cynthia Feliciano",
      "S3029",
      "An Act fostering agricultural resilience in Massachusetts",
      "Cynthia Marie Feliciano"
    ),
    href: "https://www.mapletestimony.org/testimony/W_p9FJPfvCWKKb1Q-qX6S/1"
  },
  sample(
    "neutral",
    "March 31, 2026 Chair Michlewitz, Chair Rodrigues, and Members of the Joint Committee on...",
    "H2",
    "An Act making appropriations for the fiscal year 2027 for the maintenance of the departments, boards, commissions, institutions, and certain activities of the commonwealth, for interest, sinking fund, and serial bond requirements, and for certain permanent improvements",
    "Progressive Massachusetts"
  ),
  sample(
    "oppose",
    "March 30, 2026 Chair Friedman, Chair Peisch, and members of the Special Joint Committee...",
    "H5006",
    "An Act relative to limiting state tax collection growth and returning surpluses to taxpayers",
    "Progressive Massachusetts"
  )
]

/** TEST ONLY, NOT TO SHIP. The feeds' rows: Grace K's input endorsing
 * S.3184 and H.4767 together on the health care workplace violence
 * conference, then Matt Victor's on the data privacy conference (H.5479),
 * then the four above. Their quotes are as given in full, so far; the
 * feed cuts them at 150 characters. The bubbles show only the four. */
export const sampleFeed: FeedTestimony[] = [
  {
    ...sample(
      "endorse",
      "I care most that this law passes as soon as possible. Both the house and senate versions protect healthcare worker's safety. I am not concerned about the topics that are unresolved. What I care about already exists in both bills.",
      "S3184",
      "An Act requiring health care employers to develop and implement programs to prevent workplace violence",
      "Grace K"
    ),
    alsoOn: ["H4767"],
    conferenceId: "health-care-workplace-violence"
  },
  {
    ...sample(
      "endorse",
      "A private right of action is crucial for accountability. The AG's office simply cannot handle the enforcement responsibility by itself.",
      "H5479",
      "An Act establishing the Massachusetts consumer data privacy act",
      "Matt Victor"
    ),
    conferenceId: "data-privacy"
  },
  ...sampleTestimony
]

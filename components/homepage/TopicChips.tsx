import {
  faBriefcase,
  faGavel,
  faGraduationCap,
  faHeartPulse,
  faHouse,
  faLeaf
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useTranslation } from "next-i18next"
import { Internal } from "components/links"
import { currentGeneralCourt } from "functions/src/shared"
import styles from "./Homepage.module.css"
import { topicBillsHref } from "./topicSubtopics"

/**
 * Six topics, borrowed from the agenda row on the Digital Democracy homepages.
 *
 * These are built from the subtopic level of the bill taxonomy in
 * functions/src/bills/types.ts rather than from its 21 top-level categories,
 * and a subtopic may belong to more than one topic. That is deliberate:
 * property tax is both housing and money, the MBTA is both climate and cost of
 * living, child care is both education and health. A strict partition put each
 * in one place and made it wrong in the other.
 *
 * The mapping is therefore editorial and maintained by hand, in
 * ./topicSubtopics.ts; it cannot be derived from the taxonomy.
 */
const topics = [
  { key: "education", icon: faGraduationCap, tint: "blue" },
  { key: "health", icon: faHeartPulse, tint: "red" },
  { key: "climate", icon: faLeaf, tint: "green" },
  { key: "democracy", icon: faGavel, tint: "purple" },
  { key: "housing", icon: faHouse, tint: "amber" },
  { key: "work", icon: faBriefcase, tint: "gray" }
] as const

export type TopicKey = (typeof topics)[number]["key"]

/**
 * The topics in the hero's panel: a tinted disc with its icon, and the topic's
 * name beside it. Each is a link, the whole chip and not only its name, to the
 * bills page with the topic's subtopics selected.
 */
export default function TopicChips() {
  const { t } = useTranslation("homepage")

  return (
    <div className={styles.topicChips}>
      {topics.map(({ key, icon, tint }) => (
        <Internal
          className={styles.topicChip}
          key={key}
          href={topicBillsHref(key, currentGeneralCourt)}
        >
          <span
            className={styles.topicChipDisc}
            style={{
              background: `var(--maple-color-${tint}-subtle-bg)`,
              color: `var(--maple-color-${tint}-subtle-text)`
            }}
          >
            <FontAwesomeIcon icon={icon} />
          </span>
          {t(`topics.${key}`)}
        </Internal>
      ))}
    </div>
  )
}

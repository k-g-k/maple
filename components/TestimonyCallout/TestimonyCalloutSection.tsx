import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Carousel, CarouselItem } from "react-bootstrap"
import { useMediaQuery } from "usehooks-ts"
import { Col, Container, Row } from "../bootstrap"
// TEST ONLY, NOT TO SHIP: the live testimony is swapped out for a copy of
// what mapletestimony.org showed (./sampleTestimony.ts).
// import { useRecentTestimony } from "../db"
import { sampleFeed, sampleTestimony } from "./sampleTestimony"
import TestimonyBubble from "./TestimonyBubble"
import TestimonyFeed from "./TestimonyFeed"
import { useTranslation } from "next-i18next"
import { Internal } from "components/links"
import styles from "components/homepage/Homepage.module.css"

export default function TestimonyCalloutSection() {
  // TEST ONLY, NOT TO SHIP. Put back: useRecentTestimony(4)
  const recentTestimony = sampleTestimony
  // TEST ONLY: the feeds' four most recent rows.
  const recentFeed = sampleFeed.slice(0, 4)
  const isMobile = useMediaQuery("(max-width: 768px)")

  const { t } = useTranslation("testimony")

  return (
    <section className={styles.testimonyBand}>
      <div className={styles.sectionShell}>
        <Row className={styles.peopleSaying}>
          <Col xs={12} sm={12} md={7} className={styles.sectionTitle}>
            <h2>{t("testimonyCalloutSection.peopleSaying")}</h2>
          </Col>
        </Row>
        {/* Trying out: the same testimony as two feeds, the quotes and then
          the bills, above the bubbles, to compare them. */}
        <Row className="justify-content-center">
          <Col xs={11}>
            {recentTestimony?.length ? (
              <TestimonyFeed testimony={recentFeed} variant="quote" />
            ) : null}
            {/* Browse All Testimony, as a text link with an arrow under the
              testimony, in the feed's column so it ends where the feed
              does. */}
            <div className={styles.browseTestimony}>
              <Internal
                href="/testimony"
                className={styles.browseTestimonyLink}
              >
                {t("testimonyCalloutSection.browseTestimony")}
                <FontAwesomeIcon icon={faArrowRight} aria-hidden />
              </Internal>
            </div>
          </Col>
        </Row>
        {/* Out for this exercise: the bill feed and the bubbles, which sat
          between the quote feed and Browse All Testimony. */}
        {/*
      {recentTestimony?.length ? (
        <Row className="justify-content-center mb-5">
          <Col xs={11}>
            <TestimonyFeed testimony={recentFeed} />
          </Col>
        </Row>
      ) : null}
      {isMobile ? (
        <Carousel
          style={{
            height: "100%",
            width: "80%",
            margin: "auto",
            paddingBottom: "3rem"
          }}
          variant="dark"
          wrap
          controls={false}
        >
          {recentTestimony?.map(testimony => (
            <Carousel.Item key={testimony.authorUid + testimony.billId}>
              <div style={{ width: "100%", height: "100%" }}>
                <TestimonyBubble {...testimony} />
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      ) : (
        <Row className="justify-content-center">
          <Col xs={11} xl={11} xxl={11}>
            <Row
              xs={1}
              lg={2}
              className={`gx-5 gy-3 justify-content-between py-2`}
            >
              {recentTestimony?.map(testimony => (
                <TestimonyBubble
                  key={testimony.authorUid + testimony.billId}
                  {...testimony}
                />
              ))}
            </Row>
          </Col>
        </Row>
      )}
      */}
      </div>
    </section>
  )
}

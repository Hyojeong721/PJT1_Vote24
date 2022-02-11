import React from "react";
import Image from "next/image";
import cn from "classnames";
import styles from "../../styles/mainsection.module.css";
import mainImage1 from "../../public/mainImage1.png";
import mainImage2 from "../../public/mainImage2.png";
import mainImage3 from "../../public/mainImage3.png";

function MainSection() {
  return (
    <div className={styles.cards}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="above-heading">서비스 특징</div>
            <h2 className={styles.h2}>
              병원과 환자 모두에게 도움이 되는 설문조사 서비스
            </h2>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className={cn(styles.card, "card", "p-2", "rounded")}>
              <div className={(styles.cardImage, "rounded")}>
                <Image className="img-fluid" src={mainImage1} />
              </div>
              <div className={styles.cardBody}>
                <h4 className={styles.cardTitle}>
                  병원 이용자에게 도움이 되는 서비스
                </h4>
                <p>
                  지루한 병원 대기 시간을 이용한 셀프 건강 체크 / 환자
                  보호자에게 도움이 되는 건강 정보, 병원 공지와 이벤트 확인 가능
                </p>
              </div>
            </div>

            <div className={cn(styles.card, "card", "p-2", "rounded")}>
              <div className={(styles.cardImage, "rounded")}>
                <Image className="img-fluid" src={mainImage2} />
              </div>
              <div className={styles.cardBody}>
                <h4 className={styles.cardTitle}>병원에 도움이 되는 서비스</h4>
                <p>
                  병원 이용자의 체감 대기 시간 감소 효과로 인한 병원 서비스 만족
                  증대 / 병원 서비스 만족 설문을 통해, 손쉽게 서비스 품질 체크
                  가능
                </p>
              </div>
            </div>

            <div className={cn(styles.card, "card", "p-2", "rounded")}>
              <div className={(styles.cardImage, "rounded")}>
                <Image className="img-fluid" src={mainImage3} />
              </div>
              <div className={styles.cardBody}>
                <h4 className={styles.cardTitle}>
                  키오스크 지원으로 누구나 간편하게
                </h4>
                <p>
                  키오스크와 모바일 화면 지원으로 병원 어디서든, 누구나
                  간편하게!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainSection;

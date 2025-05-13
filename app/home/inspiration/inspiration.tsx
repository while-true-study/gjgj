import Image from "next/image";
import styles from "./inspiration.module.css";

const Inspiration = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <span>영감수Zip📂</span>
      </div>
      <div className={styles.list}>
        <a
          href="https://www.youtube.com/watch?v=-7eLLhFQSVs"
          target="_blank"
          className={styles.innerContainer}
        >
          <div className={styles.textBox}>
            <p className={styles.text}>
              사소한 곳에서 <br />
              기발한 아이디어 찾는 법
            </p>
            <p className={styles.notice}>클릭 시 유튜브로 이동합니다.</p>
          </div>
          <div className={styles.thumbnail}>
            <Image
              src="https://img.youtube.com/vi/-7eLLhFQSVs/maxresdefault.jpg"
              alt="사소한 곳에서 기발한 아이디어 찾는 법 썸네일"
              width={120}
              height={67}
            />
          </div>
        </a>
      </div>

      <div className={styles.list}>
        <a
          href="https://www.youtube.com/watch?v=3p61D9tS4_E"
          target="_blank"
          className={styles.innerContainer}
        >
          <div className={styles.textBox}>
            <p className={styles.text}>
              아무나 못하는 <br />
              재치있는 제목 짓기
            </p>
            <p className={styles.notice}>클릭 시 유튜브로 이동합니다.</p>
          </div>
          <div className={styles.thumbnail}>
            <Image
              src="https://img.youtube.com/vi/3p61D9tS4_E/maxresdefault.jpg"
              alt="아무나 못하는 재치있는 제목 짓기 썸네일"
              width={120}
              height={67}
            />
          </div>
        </a>
      </div>

      <div className={styles.list}>
        <a
          href="https://www.youtube.com/watch?v=AUVhMN4ZUkA"
          target="_blank"
          className={styles.innerContainer}
        >
          <div className={styles.textBox}>
            <p className={styles.text}>재치 만점 N행시 예시</p>
            <p className={styles.notice}>클릭 시 유튜브로 이동합니다.</p>
          </div>
          <div className={styles.thumbnail}>
            <Image
              src="https://img.youtube.com/vi/AUVhMN4ZUkA/maxresdefault.jpg"
              alt="재치 만점 N행시 예시 썸네일"
              width={120}
              height={67}
            />
          </div>
        </a>
      </div>
      <div className={styles.list}>
        <a
          href="https://www.youtube.com/watch?v=Vnn9h9S46KE"
          target="_blank"
          className={styles.innerContainer}
        >
          <div className={styles.textBox}>
            <p className={styles.text}>
              호불호 갈리는 <br />
              베스킨라빈스 신상
            </p>
            <p className={styles.notice}>클릭 시 유튜브로 이동합니다.</p>
          </div>
          <div className={styles.thumbnail}>
            <Image
              src="https://img.youtube.com/vi/Vnn9h9S46KE/maxresdefault.jpg"
              alt="호불호 갈리는 베스킨라빈스 신상 썸네일"
              width={120}
              height={67}
            />
          </div>
        </a>
      </div>
    </div>
  );
};

export default Inspiration;

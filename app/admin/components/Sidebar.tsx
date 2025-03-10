import styles from "./Sidebar.module.css";

const Sidebar = ({
  changeState,
  pageState,
}: {
  changeState: (state: number) => void;
  pageState: number;
}) => {
  return (
    <div className={styles.content}>
      <div className="mt-32">
        <div
          className={`${styles.box} ${pageState === 1 ? styles.selbox : ""}`}
          onClick={() => changeState(1)}
        >
          <p>회원</p>
        </div>
        <div
          className={`${styles.box} ${pageState === 2 ? styles.selbox : ""}`}
          onClick={() => changeState(2)}
        >
          <p>충전</p>
        </div>
        <div
          className={`${styles.box} ${pageState === 3 ? styles.selbox : ""}`}
          onClick={() => changeState(3)}
        >
          <p>인출</p>
        </div>
        <div
          className={`${styles.box}`}
          onClick={() => (window.location.href = "/home.html")}
        >
          <p>홈으로</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

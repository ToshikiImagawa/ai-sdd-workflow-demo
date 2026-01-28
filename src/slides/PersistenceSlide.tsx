import styles from './PersistenceSlide.module.css';

export function PersistenceSlide() {
    return (
        <section className="slide-container" id="slide7">
            <h2 className="slide-title">知識財産の永続化</h2>
            <div className="content-area">
                <div className="two-column">
                    <div className={styles['persistence-visual-wrapper']}>
                        <div className={styles['repo-base']}>
                            <i className="fa-solid fa-server" />
                            <div className={styles['repo-label']}>Git Repository</div>
                            <div className={styles['stored-doc-icon']}>
                                <i className="fa-solid fa-file-circle-check" /> Updated!
                            </div>
                        </div>

                        <div className={`${styles['data-stream-item']} ${styles['item-task']}`}>
                            <i className="fa-solid fa-list-check" /> Task #101
                        </div>
                        <div className={`${styles['data-stream-item']} ${styles['item-log']}`}>
                            <i className="fa-solid fa-terminal" /> temp.log
                        </div>

                        <div className={styles['persistence-session-label']}>
                            <i className="fa-solid fa-arrow-down" /> Development Session{' '}
                            <i className="fa-solid fa-arrow-down" />
                        </div>
                    </div>
                    <div>
                        <h3>Knowledge vs Ephemeral</h3>
                        <ul>
                            <li>
                                <strong>PRD / Spec / Design:</strong>
                                <br />
                                永続的な知識資産としてリポジトリに残る。
                            </li>
                            <li>
                                <strong>Tasks / Logs:</strong>
                                <br />
                                一時的なデータ。実装完了後に設計書へ統合され、<code>/task_cleanup</code>
                                で削除される。
                            </li>
                        </ul>
                        <p style={{ marginTop: '20px', color: '#e60012' }}>
                            → セッションを跨いでも、コンテキストが失われない。
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

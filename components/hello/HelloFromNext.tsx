export default function HelloFromNext(props: { msg?: string }) {
    return (
        <div style={{ padding: 12, border: '1px solid #ccc', borderRadius: 4 }}>
            <strong>Next Remote</strong>
            <div>Message: {props.msg ?? 'hello from next mf remote'}</div>
        </div>
    )
}
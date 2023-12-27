import zxcvbn from "zxcvbn"
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"

const PasswordMeter = ({ password }: { password: string }) => {
    const result = zxcvbn(password);
    const score = result.score
    const meterWidth = score > 0 ? (score * 100) / 4 : 10

    const changeBar = () => {
        if (score == 0) {
            return { color: '#828282', label: 'very week' }
        } else if (score == 1) {
            return { color: '#EA1111', label: 'weak' }
        } else if (score == 2) {
            return { color: '#FFAD00', label: 'fear' }
        } else if (score == 3) {
            return { color: '#9bc158', label: 'Good' }
        } else if (score == 4) {
            return { color: '#00b500', label: 'strong' }
        }else{
            return { color: '', label: ''}
        }
    }

    console.log(score)

    const passwordMeter = css({
        width: `${meterWidth}%`,
        backgroundColor: changeBar()?.color,
        height: '10px',
        borderRadius: '5px',
    })

    return (
        <div>
            <p>{changeBar()?.label}</p>
            <div css={passwordMeter}></div>
        </div>
    )
}

export default PasswordMeter
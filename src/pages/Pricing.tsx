import { faCheckCircle } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useTranslation } from 'react-i18next'

const Pricing = () => {

    const { t, i18n } = useTranslation()

    return (
        <div className="container">
            <div className="pricing-title">
                <h2 className="text-center">Predictable pricing that <br />scales with you</h2>
            </div>
            <div className="row">
                <div className="col-6">
                    <div className="shadow pricing-hobby rounded">
                        <h3 className="pricing-plantype">{t('hello')}</h3>
                        <h4 className="pricing-price">$0</h4>
                        <p className="pricing-text">Let's start chatting</p>
                        <ul className="pricing-content">
                            <li><FontAwesomeIcon icon={faCheckCircle} />Token 35 for using AI</li>
                            <li><FontAwesomeIcon icon={faCheckCircle} /> Display number of 10 conversation histories</li>
                            <li><FontAwesomeIcon icon={faCheckCircle} /> 1 site theme</li>
                        </ul>
                        <div className="pricing-btn">Starting Chat</div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="shadow pricing-pro rounded">
                        <h3 className="pricing-plantype">Pro</h3>
                        <h4 className="pricing-price">$10000</h4>
                        <p className="pricing-text">Hobby plus higher limits</p>
                        <ul className="pricing-content">
                            <li><FontAwesomeIcon icon={faCheckCircle} />Token 35 for using AI</li>
                            <li><FontAwesomeIcon icon={faCheckCircle} /> Display number of 10 conversation histories</li>
                            <li><FontAwesomeIcon icon={faCheckCircle} /> 1 site theme</li>
                        </ul>
                        <div className="pricing-btn">Update Plan</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Pricing
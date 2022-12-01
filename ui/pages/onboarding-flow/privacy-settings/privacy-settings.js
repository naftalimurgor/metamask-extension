import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Button from '../../../components/ui/button';
import Typography from '../../../components/ui/typography';
import {
  FONT_WEIGHT,
  TYPOGRAPHY,
} from '../../../helpers/constants/design-system';
import { useI18nContext } from '../../../hooks/useI18nContext';
import {
  setCompletedOnboarding,
  setFeatureFlag,
  setUsePhishDetect,
  setUseTokenDetection,
  setUseCurrencyRateCheck,
} from '../../../store/actions';
import { ONBOARDING_PIN_EXTENSION_ROUTE } from '../../../helpers/constants/routes';
import { Setting } from './setting';

export default function PrivacySettings() {
  const t = useI18nContext();
  const dispatch = useDispatch();
  const history = useHistory();
  const [usePhishingDetection, setUsePhishingDetection] = useState(true);
  const [turnOnTokenDetection, setTurnOnTokenDetection] = useState(true);
  const [turnOnCurrencyRateCheck, setTurnOnCurrencyRateCheck] = useState(true);
  const [showIncomingTransactions, setShowIncomingTransactions] =
    useState(true);

  const handleSubmit = () => {
    dispatch(
      setFeatureFlag('showIncomingTransactions', showIncomingTransactions),
    );
    dispatch(setUsePhishDetect(usePhishingDetection));
    dispatch(setUseTokenDetection(turnOnTokenDetection));
    dispatch(setUseCurrencyRateCheck(turnOnCurrencyRateCheck));
    dispatch(setCompletedOnboarding());
    history.push(ONBOARDING_PIN_EXTENSION_ROUTE);
  };

  return (
    <>
      <div className="privacy-settings" data-testid="privacy-settings">
        <div className="privacy-settings__header">
          <Typography variant={TYPOGRAPHY.H2} fontWeight={FONT_WEIGHT.BOLD}>
            {t('setAdvancedPrivacySettings')}
          </Typography>
          <Typography variant={TYPOGRAPHY.H4}>
            {t('setAdvancedPrivacySettingsDetails')}
          </Typography>
        </div>
        <div
          className="privacy-settings__settings"
          data-testid="privacy-settings-settings"
        >
          <Setting
            value={showIncomingTransactions}
            setValue={setShowIncomingTransactions}
            title={t('showIncomingTransactions')}
            description={t('onboardingShowIncomingTransactionsDescription', [
              <a
                key="etherscan"
                href="https://etherscan.io/"
                target="_blank"
                rel="noreferrer"
              >
                {t('etherscan')}
              </a>,
              <a
                href="https://etherscan.io/privacyPolicy"
                target="_blank"
                rel="noreferrer"
                key="privacyMsg"
              >
                {t('privacyMsg')}
              </a>,
            ])}
          />
          <Setting
            value={usePhishingDetection}
            setValue={setUsePhishingDetection}
            title={t('usePhishingDetection')}
            description={t('onboardingUsePhishingDetectionDescription', [
              <a
                href="https://www.jsdelivr.com"
                target="_blank"
                rel="noreferrer"
                key="jsDeliver"
              >
                {t('jsDeliver')}
              </a>,
              <a
                href="https://www.jsdelivr.com/terms/privacy-policy-jsdelivr-com"
                target="_blank"
                rel="noreferrer"
                key="privacyMsg"
              >
                {t('privacyMsg')}
              </a>,
            ])}
          />
          <Setting
            value={turnOnTokenDetection}
            setValue={setTurnOnTokenDetection}
            title={t('turnOnTokenDetection')}
            description={t('useTokenDetectionPrivacyDesc')}
          />
          <Setting
            value={turnOnCurrencyRateCheck}
            setValue={setTurnOnCurrencyRateCheck}
            title={t('currencyRateCheckToggle')}
            description={t('currencyRateCheckToggleDescription', [
              <a
                key="coingecko_link"
                href="https://api.coingecko.com/api/v3"
                rel="noreferrer"
                target="_blank"
              >
                {t('coingeckoAPI')}
              </a>,
              <a
                key="cryptocompare_link"
                href="https://min-api.cryptocompare.com"
                rel="noreferrer"
                target="_blank"
              >
                {t('cryptocompareAPI')}
              </a>,
              <a
                key="privacy_policy_link"
                href=""
                rel="noreferrer"
                target="_blank"
              >
                {t('privacyMsg')}
              </a>,
            ])}
          />
        </div>
        <Button type="primary" rounded onClick={handleSubmit}>
          {t('done')}
        </Button>
      </div>
    </>
  );
}

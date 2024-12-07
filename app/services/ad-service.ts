import { AdmobBanner, AdmobReward, createBanner, createReward, hideBanner, preloadReward, showBanner } from '@nativescript/admob';

export class AdService {
  private static instance: AdService;
  private readonly bannerId = 'ca-app-pub-XXXXX/YYYYY'; // Replace with your AdMob ID
  private readonly rewardId = 'ca-app-pub-XXXXX/YYYYY'; // Replace with your AdMob ID

  private constructor() {}

  static getInstance(): AdService {
    if (!AdService.instance) {
      AdService.instance = new AdService();
    }
    return AdService.instance;
  }

  async showRewardedAd(): Promise<boolean> {
    try {
      await preloadReward({
        androidAdId: this.rewardId,
        testing: true
      });

      const reward = await createReward({
        androidAdId: this.rewardId,
        testing: true
      });

      return true;
    } catch (error) {
      console.error('Error showing rewarded ad:', error);
      return false;
    }
  }

  async showBannerAd() {
    try {
      await createBanner({
        androidAdId: this.bannerId,
        testing: true,
        position: 'bottom'
      });
    } catch (error) {
      console.error('Error showing banner ad:', error);
    }
  }

  hideBannerAd() {
    hideBanner();
  }
}
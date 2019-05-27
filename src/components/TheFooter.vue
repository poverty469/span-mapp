<template>
  <div class="the-footer">
    <div class="social-media__container">
      <a href="https://www.instagram.com/poverty_action/" target="_blank">
        <instagram-logo
          class="social-media__icon instagram-icon"
        ></instagram-logo>
      </a>
      <a href="https://twitter.com/PovertyActionWA" target="_blank">
        <twitter-logo class="social-media__icon twitter-icon"></twitter-logo>
      </a>
      <a href="https://www.facebook.com/PovertyAction" target="_blank">
        <facebook-logo class="social-media__icon facebook-icon"></facebook-logo>
      </a>
    </div>
    <div class="the-footer__righter">
      <action-button
        class="take-action-button"
        text="get involved"
        urlLink="https://povertyaction.org/advocacy-actions/"
      ></action-button>
    </div>
  </div>
</template>

<script>
import TwitterLogo from "@/assets/svg/twitter_icon.svg";
import InstagramLogo from "@/assets/svg/instagram_icon.svg";
import FacebookLogo from "@/assets/svg/facebook_icon.svg";
import ActionButton from "@/components/ActionButton";

export default {
  name: "TheFooter",
  components: { InstagramLogo, TwitterLogo, FacebookLogo, ActionButton },
  props: {},
  data: function() {
    return {};
  }
};
</script>

<style lang="scss">
.the-footer {
  display: flex;
  justify-content: space-between;
  background: $light-tan;
  border-top: $thin-border solid $charcoal;
  box-shadow: $standard-box-shadow;

  overflow: hidden;
}

.social-media__container {
  display: flex;
}

.social-media__icon {
  transform: translateY(-50%);
  top: 50%;
  position: relative;
  width: 40px;
  padding: 0 3% 0 0;
}

.social-media__icon:not(.twitter-icon) > .vectors {
  fill: $bright-red;
}

.social-media__icon.twitter-icon {
  fill: $light-tan;
  stroke: $bright-red;
}

.instagram-icon {
  height: 1.4rem;
}

.twitter-icon {
  height: 1.2rem;
}

.facebook-icon {
  height: 1.4rem;
  width: 1.8rem;
}

.the-footer__righter {
  display: flex;
  align-items: center;
  justify-content: center;
  width: $righter-width;
}

.take-action-button > .action-button__container {
  position: relative;
  width: fit-content;
  height: 60%;

  border: 2px solid $bright-red;
  border-radius: 3px;

  user-select: none;
}
</style>

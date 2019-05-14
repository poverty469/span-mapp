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
    <a
      href="https://povertyaction.org/advocacy-actions/"
      class="action-button__click-area"
      target="_blank"
    >
      <div class="action-button__container">
        <div class="action-button__text">TAKE ACTION</div>
      </div>
    </a>
  </div>
</template>

<script>
import TwitterLogo from "@/assets/svg/twitter_icon.svg";
import InstagramLogo from "@/assets/svg/instagram_icon.svg";
import FacebookLogo from "@/assets/svg/facebook_icon.svg";

export default {
  name: "TheFooter",
  components: { InstagramLogo, TwitterLogo, FacebookLogo },
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

.action-button__container {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  right: 1rem;
  width: fit-content;
  height: 60%;

  border: 2px solid $bright-red;
  border-radius: 3px;
}

.action-button__container:hover {
  background: $dark-orange;
}

.action-button__text {
  position: relative;
  top: 50%;
  transform: translateY(-50%);

  padding: 0 0.5rem;
  @include char-style($action-button...);
  letter-spacing: 1px;
  left: 1px; // Compensates an offset from the letter-spacing
}

.takeaction {
  margin-top: 5px;
  margin-left: 980px;
  right: 0;
}
</style>

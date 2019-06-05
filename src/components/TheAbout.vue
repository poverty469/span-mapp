<template>
  <div class="about-container">
    <p class="about-paragraph">
        Solid Ground (founded in 1974 as the Fremont Public Association) is an anti-poverty and social service
        organization in Seattle, Washington. Originating in Seattle's Fremont neighborhood and now based in the 
        adjacent Wallingford neighborhood, the organization now serves clients throughout Seattle, King County 
        and (for some programs) statewide. One of Solid Ground's advocacy programs is the Statewide Poverty Action
        Network. They work to create systemic change to address root causes of poverty. <br /><br /> This program was
        established in 1996, in response to the federal government’s passage of the Personal Responsibility and
        Work Opportunity Reconciliation Act (PRWORA), or “welfare reform.” Ten leaders from communities of color
        came together to form the Washington Welfare Reform Coalition, which in 2001 changed its name to the Statewide
        Poverty Action Network. The change was made to better to represent an expanded focus on poverty issues of statewide
        significance.<br /><br />Poverty Action is a leader in statewide issues and maintains a full-time lobby presence in
        Olympia. With over 7,000 individual members of their network, Poverty Action is among the largest non-profit
        advocacy groups in Washington state. In addition to political advocacy, Poverty Action also coordinates the "Vote 
        for A Change Campaign"- An award winning program focused on engaging people living with low-incomes, the previously 
        incarcerated and communities of color in electoral politics. Over 100,000 Washingtonians have been reached through 
        "Vote for A Change" Campaigns from 2004-2011.
    </p>
  </div>
</template>

<script>
export default {
  name: "TheAbout",
  props: {},
  data: function() {
    return {};
  },
  components: {}
};
</script>

<style lang="scss">
.about-container {
    display: flex;
    justify-content: center;
    
}

.about-paragraph {
    color: $dark-orange;
    font-size: 24px;
    padding: 4em;
}
</style>
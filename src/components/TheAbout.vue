<template>
  <div class="about-container">
    <p class="about-paragraph">
        
The Statewide Poverty Action Network is an anti-poverty advocacy organization located in Seattle, Washington.
<br/><br/>
Through in-person community organizing and online advocacy, we advance equitable policy solutions for low-income people in Washington state.
<br/><br/>
Poverty is a vast issue that is often difficult to define. With this in mind, we chose to create an interactive map that illustrates poverty in Washington state through the lens of the four policy campaigns that our organization works on. Visitors to this map will be guided through a picture of the economic realities for Washington families through depictions of the variable costs of living throughout the state, median income levels, median housing costs, rates of homelessness, and more. Personal story is central to our organization's mission, and we have included the stories of Washingtonians who have experience with the issues we advocate on. 
<br/><br/>
We worked with students from the University of Washington's Geography Department to create this map in the summer of 2019. 



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
    color: $dark-grey;
    font-size: 24px;
    padding: 4em;
}
</style>
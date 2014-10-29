
app.factory('Category', ['$http', '$location', '$q', '$filter',
  function($http, $location, $q, $filter){

    //****Create the factory object****//
    var Category = {};

    
    //****Private variables*****//
    var caiCrimeDefinition = {
      title : 'Crime',
      defaultStates : {
        time : '2014',
        extent : 'within-a-quarter-mile',
        filter : 'summary',
        details : 'report'
      }
    };

    var propertyDefinition = {
      title : 'Property',
      defaultStates : {
        time : 'current',
        extent : 'location',
        filter : 'summary',
        details : 'report'
      }
    };

    var neighborhoodCrimeDefinition = {
      showTimeOptions : true,
      defaultTimeOption : 2,
      showExtentOptions : false,
      defaultExtentOption : 'neighborhood',
      showFilterOptions : false,
      defaultFilterOption : 'summary'
    };

    // var propertyDefinition = {
    //   showTimeOptions : false,
    //   defaultTimeOption : 'current',
    //   showExtentOptions : false,
    //   defaultExtentOption : 'location',
    //   showFilterOptions : false,
    //   defaultFilterOption : 'summary'
    // };

    var categoryDefinitions = {
      cai : {
        crime : caiCrimeDefinition,
        property : propertyDefinition
      },
      neighborhood : {
        crime : neighborhoodCrimeDefinition
      }
    };

    //****API*****//

    Category.getDefinition = function(category){
      //for now we only have addresses
      return categoryDefinitions.cai[category];
      //******TODO******//
      //if cai do something if neighborhood do something else
      // if(locationProperties.locationType === 'cai'){
      //   return categoryDefinitions.cai[category];
      // }else{
      //   return categoryDefinitions.neighborhood[category];
      // } 
    };


    //****Return the factory object****//
    return Category; 

    
}]); //END Category factory function
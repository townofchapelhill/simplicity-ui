simplicity.factory('Owner', ['$http', '$location', '$q', '$filter', '$stateParams', 'AddressCache', 'simplicityBackend', 'COLORS', 'CODELINKS',
  function($http, $location, $q, $filter, $stateParams, AddressCache, simplicityBackend, COLORS, CODELINKS){   

    var Owner = {};


    var topicProperties = {
      'name' : 'owner',
      'plural' : 'owners',
      'title' : 'Owner',
      'searchForText' : 'an address, street, owner, or PIN',
      'position' : 9,
      'searchby' : {
        'address' : {
          'params' : {
            'type' : null,
            'timeframe' : null,
            'extent' : null,
            'centermap' : null,
            'defaultView' : 'details',
            'validViews' : ['details', 'map']
          },
          'prepositions' : {
            'searchby' : 'at',
          },
          'headerTemplate' : 'topics/topic-headers/topic.header.at.html',
        },
        'google_places' : {
          'params' : {
            'type' : null,
            'timeframe' : null,
            'extent' : null,
            'centermap' : null,
            'defaultView' : 'details',
            'validViews' : ['details', 'map']
          },
          'prepositions' : {
            'searchby' : 'at',
          },
          'headerTemplate' : 'topics/topic-headers/topic.header.at.html',
        },
        'street_name' : {
          'params' : {
            'type' : null,
            'timeframe' : null,
            'extent' : null,
            'centermap' : null,
            'defaultView' : 'list',
            'validViews' : ['list', 'map']
          },
          'prepositions' : {
            'searchby' : 'along',
          },
          'headerTemplate' : 'topics/topic-headers/topic.header.along.html',
        },
        'pinnum' : {
          'params' : {
            'type' : null,
            'timeframe' : null,
            'extent' : null,
            'centermap' : null,
            'defaultView' : 'details',
            'validViews' : ['details', 'map']
          },
          'prepositions' : {
            'searchby' : 'at',
          },
          'headerTemplate' : 'topics/topic-headers/topic.header.at.html',
        }
      },
      'views' : {
        'map' : {'label' : 'Map View', 'template' : null},
        'details' : {'label' : 'Details View', 'template' : 'topics/topic-components/owner/owner.details.view.html'},
        'list' : {'label' : 'List View', 'template' : 'topics/topic-components/owner/owner.list.view.html'},
      },
      'iconClass' : 'flaticon-real6',
      'linkTopics' : ['crime', 'trash', 'recycling'],
      'questions' : {
        'topic' : "Do you want to know a property owner's addresses?",
        'address' : "Do you want to know the property owner's address at this address?",
        'street_name' : "Do you want to know the property owners' addresses along this street?",
        'pinnum' : "Do you want to know the property owner's address for this PIN?"
      }
    };


    //We need to use the pinnum to lookup property information 
    //We can access the pinnum by cross-referencing the cividaddress id or centerline id in the xref table
    //WE can acess the civicaddress id from the stateParams
    Owner.build = function(){
      var addressCache = AddressCache.get();
      var pinnum2civicaddressid = AddressCache.pinnum2civicaddressid();
      var q = $q.defer();

      if($stateParams.searchby === 'address'){ 

        simplicityBackend.simplicityQuery('xrefs', {'civicaddressId' : Number($stateParams.id)})
          .then(function(xRef){

            simplicityBackend.simplicityQuery('owners', {'pinnum' : xRef.features[0].properties.pinnum})
              .then(function(owner){
                q.resolve(owner);
              });
          });
      }else if($stateParams.searchby === 'street_name'){ 

        var idArray = $stateParams.id.split(',');

        for (var i = 0; i < idArray.length; i++) {
          idArray[i] = Number(idArray[i]);
        }

        simplicityBackend.simplicityQuery('xrefs', {'centerlineIds' : idArray.join()})
          .then(function(xRefPin){
            var xrefPinString = '';
            for (var x = 0; x < xRefPin.features.length; x++) {
              if(x === 0){
                xrefPinString = xrefPinString + "'" + xRefPin.features[x].properties.pinnum + "'";
              }else{
                xrefPinString = xrefPinString + ",'" + xRefPin.features[x].properties.pinnum + "'";
              }         
            }
            simplicityBackend.simplicityQuery('owners', {'pinnums' : xrefPinString})
              .then(function(owner){
                q.resolve(owner);
              });
          });
      }else if ($stateParams.searchby === 'pinnum' || $stateParams.searchby === 'owner_name'){
        var pinArray = $stateParams.id.split(',');
        var pinString = '';
        for (var p = 0; p < pinArray.length; p++) {
          if(p === 0){
            pinString = pinString + "'" + pinArray[p] + "'";
          }else{
            pinString = pinString + ",'" + pinArray[p] + "'";
          }         
        }
        simplicityBackend.simplicityQuery('owners', {'pinnums' : pinString})
          .then(function(owner){
            q.resolve(owner);
          });
      }
      return q.promise;
    };//END owner function

    Owner.getTopicProperties = function(){
      return topicProperties;
    };


    //****Return the factory object****//
    return Owner; 

    
}]); //END Owner factory function




   


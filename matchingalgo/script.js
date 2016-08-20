
function getWeight(score,importance) {
    var weights= [[0.96,0.97,0.98,0.99,1],
                  [0.90,0.98,0.95,0.98,1],
                  [0.70,0.75,0.90,0.95,1]];
    
    return weights[parseInt(score)-1][parseInt(importance)];
}

function getAgeScore(seekerAge,upperLimit,lowerLimit)
{
    if(lowerLimit-6<=seekerAge && seekerAge<=upperLimit+6)
        return 1;
    else if(lowerLimit-5<=seekerAge && seekerAge<=upperLimit+5)
        return 2;
    else if(lowerLimit-3<=seekerAge && seekerAge<=upperLimit+3)
        return 3;
    else if(lowerLimit-2<=seekerAge && seekerAge<=upperLimit+2)
        return 4;
    else return 5;
}

function getGenderScore(seeker,required)
{
    if((required=="1" && seeker=="male") || (required=="3" && seeker=="male") || (required=="2" && seeker=="female") || (required=="4" && seeker=="female"))
        return 5;
    else if((required=="3" && seeker=="female") || (required=="4" && seeker=="male")) 
        return 3;
    else return 1;
}

function degreeToRad(deg) {
  return deg * (Math.PI/180)
}

function haversineFormula(lat1,lon1,lat2,lon2)
{
  var dLat = degreeToRad(lat2-lat1); 
  var dLon = degreeToRad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(degreeToRad(lat1)) * Math.cos(degreeToRad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = 6371 * c;  
  return d;
}

function getDistanceScore(lat1,lon1,lat2,lon2)
{
    var dist= haversineFormula(lat1,lon1,lat2,lon2);
    if(dist>=50)
       return 1;
    else if(dist>=40)
        return 2;
    else if(dist>=30)
        return 3;
    else if(dist>20)
        return 4;
    else return 5;
}

function getTotalScore(jobseeker)
{
    return jobseeker.ageW*jobseeker.distW*jobseeker.genderW;
}

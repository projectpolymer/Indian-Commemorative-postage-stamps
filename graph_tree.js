var margin = {top: 10, right: 10, bottom: 10, left: 10},
    width = 2400 - margin.left - margin.right, //1500 //15000 for year 2000 and 1984 use 2400and for small set use 2000
    height = 1000 - margin.top - margin.bottom; //1000

var svg = d3.select("#my_dataviz").append("svg")
    .attr("width", 3000 + margin.left + margin.right) //width //2000 //17000 // for year 2000 and 1984 use 3000, 1000 for small set use 2000
    .attr("height", 1000 + margin.top + margin.bottom) //height //1000
    .append("g")
    .attr('id','parent_group')
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    //.attr('transform', 'rotate(180,500,500)')
    .attr('transform', 'translate(100,100)');

const stratify = d3.stratify()
                   .id(d => d.name)
                   .parentId(d => d.parent)

const tree = d3.tree()
               .size([width, height - 800])

const rootNode = stratify(data);

const treeData = tree(rootNode);

var dummy = treeData.descendants();
console.log(dummy)


const nodes = svg.selectAll('.node')
                 .data(treeData.descendants());

const minicircles = svg.selectAll('.smallcircles')
                       .data(treeData.descendants());

const denomcircles = svg.selectAll('.denomcircles');

const lines_links_colours = '#8E8D8D';





//var denom_log_Scale = d3.scaleLog().domain([0.01, 15]).range([8, 24]);  //for children circles 10,450 //for year circles 32,921
var denom_log_Scale = d3.scaleLog().domain([0.01, 15]).range([3, 15]);
//var denom_linear_scale = d3.scaleLinear().domain([0.01, 15]).range([8,15]);

var denom_child_linear_scale = d3.scaleLog().domain([0.1, 150]).range([10, 50]);
var denom_sum_year_scale = d3.scaleLog().domain([0.5,295]).range([10,100])
const opacity = 0.5;
const denom_colour = '#a9bb9e';
const denom_stroke = '#5b8d46';



/* enterNodes.append('rect')
            .attr('fill', function(d){
                if(d.data.name.length >4){
                    if(d.data.name == 'Thematic'){
                        return d.data.color
                    }
                    else if(d.data.name == 'Defence'){
                        return d.data.color
                    }
                    else if(d.data.name == 'Event'){
                        return d.data.color
                    }
                    else if(d.data.name == 'Institution'){
                        return d.data.color
                    }
                    else{
                        return d.data.color
                    }
                }
                else{
                    return 'none'
                }
            })
            .attr('stroke', 'none')
            .attr('height', 3)
            .attr('width', 17)
            .attr('transform','translate(-8,-2)') */


//var denom_sum = 0;
var denom_sum_true = 0;
var denom_year_sum = 0;
var denom_year_sum_list = [];

           for(var i =0;i<dummy.length;i++)
           {
               if(dummy[i].data.name.toString().length == 4)
               {
                   for(var j =0; j<dummy[i].children.length; j++)
                   {
                       if(dummy[i].data.thm_count>0)
                       {
                        themeCircles('#dd523f',dummy[i].children[j].x, dummy[i].children[j].y, dummy[i].data.thm_count);

                           for(var k = 0; k< dummy[i].data.thm_count_date.length; k++)
                           { //dummy[i].data.thm_count_denom.sort();
                               svg.append('circle').attr('class', 'denomcircles')
                                           .attr('r',function(d){
                                               //denom_sum = denom_sum+denom_linear_scale(dummy[i].data.thm_count_denom[k]);
                                               denom_sum_true = denom_sum_true+dummy[i].data.thm_count_denom[k];
                                               return denom_log_Scale(dummy[i].data.thm_count_denom[k])
                                           })
                                           .attr('cx', function(d)
                                                       {
                                                           return dummy[i].children[j].x;
                                                       }
                                                )
                                           .attr('cy', function(d)
                                                       {
                                                           return (dummy[i].children[j].y + (20*dummy[i].data.thm_count_date[k]))
                                                       }
                                                )
                                           .attr('opacity',opacity)
                                                              

           
                           }

                           dummy[i].data.thm_count = 0;
           
                       }
                       else if(dummy[i].data.dfn_count>0)
                       {
                        themeCircles('#2e8797',dummy[i].children[j].x, dummy[i].children[j].y, dummy[i].data.dfn_count);

                           for(var k = 0; k< dummy[i].data.dfn_count_date.length; k++)
                           { //dummy[i].data.dfn_count_denom.sort();
                               svg.append('circle').attr('class', 'denomcircles')
                                           .attr('r',function(d){
                                               //denom_sum = denom_sum+denom_linear_scale(dummy[i].data.dfn_count_denom[k]);
                                               denom_sum_true = denom_sum_true+dummy[i].data.dfn_count_denom[k];
                                               return denom_log_Scale(dummy[i].data.dfn_count_denom[k])
                                           })
                                           .attr('cx', function(d)
                                                       {
                                                           return dummy[i].children[j].x;
                                                       }
                                                )
                                           .attr('cy', function(d)
                                                       {
                                                           return (dummy[i].children[j].y + (20*dummy[i].data.dfn_count_date[k]))
                                                       }
                                                )
                                           .attr('opacity',opacity)
           
                           }
                           dummy[i].data.dfn_count = 0
           
                       }
                       else if(dummy[i].data.evn_count>0)
                       { 
                           themeCircles('#89c474',dummy[i].children[j].x, dummy[i].children[j].y, dummy[i].data.evn_count);

                           for(var k = 0; k< dummy[i].data.evn_count_date.length; k++)
                           { //dummy[i].data.evn_count_denom.sort();
                               svg.append('circle').attr('class', 'denomcircles')
                                           .attr('r',function(d){
                                               //denom_sum = denom_sum+denom_linear_scale(dummy[i].data.evn_count_denom[k]);
                                               denom_sum_true = denom_sum_true+dummy[i].data.evn_count_denom[k];
                                               return denom_log_Scale(dummy[i].data.evn_count_denom[k])
                                           })
                                           .attr('cx', function(d)
                                                       {
                                                           return dummy[i].children[j].x;
                                                       }
                                                )
                                           .attr('cy', function(d)
                                                       {
                                                           return (dummy[i].children[j].y + (20*dummy[i].data.evn_count_date[k]))
                                                       }
                                                )
                                           .attr('opacity',opacity)
           
                           }
                           dummy[i].data.evn_count = 0
           
                       }
                       else if(dummy[i].data.ins_count>0)
                       { 
                           themeCircles('#e1ce6f',dummy[i].children[j].x, dummy[i].children[j].y, dummy[i].data.ins_count);

                           for(var k = 0; k< dummy[i].data.ins_count_date.length; k++)
                           { //dummy[i].data.ins_count_denom.sort();
                               svg.append('circle').attr('class', 'denomcircles')
                                           .attr('r',function(d){
                                               //denom_sum = denom_sum+denom_linear_scale(dummy[i].data.ins_count_denom[k]);
                                               denom_sum_true = denom_sum_true+dummy[i].data.ins_count_denom[k];
                                               return denom_log_Scale(dummy[i].data.ins_count_denom[k])
                                           })
                                           .attr('cx', function(d)
                                                       {
                                                           return dummy[i].children[j].x;
                                                       }
                                                )
                                           .attr('cy', function(d)
                                                       {
                                                           return (dummy[i].children[j].y + (20*dummy[i].data.ins_count_date[k]))
                                                       }
                                                )
                                           .attr('opacity',opacity)
           
                           }
                           dummy[i].data.ins_count = 0
           
                       }
                       else if(dummy[i].data.prs_count>0)
                       {
                           themeCircles('#9d4254',dummy[i].children[j].x, dummy[i].children[j].y, dummy[i].data.prs_count);

                           for(var k = 0; k< dummy[i].data.prs_count_date.length; k++)
                           {  //dummy[i].data.prs_count_denom.sort();
                               svg.append('circle').attr('class', 'denomcircles')
                                           .attr('r',function(d){
                                               //denom_sum = denom_sum+denom_linear_scale(dummy[i].data.prs_count_denom[k]);
                                               denom_sum_true = denom_sum_true+dummy[i].data.prs_count_denom[k];
                                               return denom_log_Scale(dummy[i].data.prs_count_denom[k])
                                           })
                                           .attr('cx', function(d)
                                                       {
                                                           return dummy[i].children[j].x;
                                                       }
                                                )
                                           .attr('cy', function(d)
                                                       {
                                                           return (dummy[i].children[j].y + (20*dummy[i].data.prs_count_date[k]))
                                                       }
                                                )
                                           .attr('opacity',opacity)
           
                           }
                           dummy[i].data.prs_count = 0
           
                       }
                       //console.log("denom sum  is "+denom_sum.toString());

                       //editing starts here
                       denom_year_sum = denom_year_sum+denom_sum_true;
                       //console.log("real value  for year "+dummy[i].data.name+ " is "+denom_sum_true+" scaled value is "+denom_child_linear_scale(denom_sum_true))
                       svg.append('circle').attr('class', 'totaldenom')
                       .attr('r', denom_child_linear_scale(denom_sum_true))
                       .attr('cx', dummy[i].children[j].x)
                       .attr('cy', 440+denom_child_linear_scale(denom_sum_true))
                       .attr('opacity', 0.25)
                       .attr('fill', '#F1948A')
                       .attr('stroke', "#E74C3C")
                       .attr('stroke-width', 1);

                       svg.append('text').attr('class', 'yearchildsum')
                       .attr('x', dummy[i].children[j].x)
                       .attr('y', 440+denom_child_linear_scale(denom_sum_true))
                       .attr('text-anchor', 'middle')
                       .attr('fill', lines_links_colours)
                       .style("font-size", "10px")
                       .text(function(d){
                            return parseFloat(denom_sum_true).toFixed(2)
                       })

                       //denom_sum = 0
                       denom_sum_true = 0
                       
           
                   }
                   //console.log("denom_year_sum is"+denom_year_sum);
                   denom_year_sum_list.push(denom_year_sum)

                   denom_year_sum = 0;
               }
           }

//console.log(denom_year_sum_list.length)
//console.log("maximum for an year is "+Math.min(...denom_year_sum_list))
for(var i =0; i<denom_year_sum_list.length;i++){
    //console.log("for year "+ (i+1) +" denom is "+denom_year_sum_list[i]);
svg.append('circle')
.attr('class', 'denomsumyearcircles')
.attr('cx', dummy[i+1].x)
.attr('cy', dummy[i+1].y)
.attr('r', denom_sum_year_scale(denom_year_sum_list[i]))
.attr('opacity', 0.4)
.attr('fill', '#AED6F1')
.attr('stroke', '#3498DB')
.attr('stroke-width', 1)


svg.append('text').attr('class', 'yearsum')
                       .attr('x', dummy[i+1].x)
                       .attr('y', (dummy[i+1].y-17))
                       .attr('text-anchor', 'middle')
                       .attr('fill', lines_links_colours)
                       .style("font-size", "10px")
                       .text(function(d){
                            return parseFloat(denom_year_sum_list[i]).toFixed(2)
                       })
}


           
svg.selectAll('.denomcircles')
    .attr('fill',denom_colour )
    .attr('stroke',denom_stroke )
    .attr('stroke-width', 1);  

/* for(var i =0;i<denom_year_sum_list.length;i++){
    enterNodes.append('circle')
    .attr('r', denom_year_sum_list[i])
    .attr('fill', '#aaa')
    .attr('opacity',opacity)
} */

const links = svg.selectAll('.link')
                 .data(treeData.links());

const lines = svg.selectAll('.lines')
                 .data(treeData.descendants());

lines.enter()
     .append('path')
     .attr('class', 'lines')
     .attr('fill', 'none')
     .attr('stroke', lines_links_colours)
     .attr('stroke-width', 0.9)
     //.style("stroke-dasharray", ("5, 3"))
     .attr('d', function(d){
         if(d.data.name.length > 4){
         var mystr = ['M' + d.x + ',' + (d.y+6) + ' V' + (d.y+260)];
         return mystr
         }
     }    
     )

links.enter()
     .append('path')
     .attr('class', 'link')
     .attr('fill', 'none')
     .attr('stroke', lines_links_colours)
     .attr('stroke-width', 0.9)
     //.style("stroke-dasharray", ("5, 3"))
     .attr('d', d3.linkVertical()
                  .x(d => d.x)
                  .y(d => d.y-6)    
     )



const enterNodes = nodes.enter()
     .append('g')
     .attr('class', 'node')
     .attr('transform', d => `translate(${d.x}, ${d.y})`);

enterNodes.append('text')
          .attr('text-anchor', 'middle')
          .attr('fill', lines_links_colours)
          .style("font-size", "14px")
          .text(function(d){
            if(d.data.name.toString().length <= 4){
                return d.data.name
            }
          })


for(var i = 0; i<12; i++){
    minicircles.enter()
         .append('circle')
         .attr('fill', lines_links_colours)
          .attr('r', function(d){
            if(d.data.name.length > 4){
                return 2;
            }
          })
          .attr('cx', function(d){
            if(d.data.name.length > 4){
            return d.x;
            }
        })
          .attr('cy', function(d){
            if(d.data.name.length > 4){
            return ((d.y+20)+i*20)
            }
        });
    };


var rotation = 0
function themeCircles(color, x, y, count){
    //console.log(count)
    svg.append('circle')
        .attr('class', 'themecircles')
        .attr('r', 6)
        .attr('cx', x)
        .attr('cy', y)
        .attr('fill', color)

    for(var i = 0;i <count;i++){
        console.log(i*(360/count))
        svg.append('circle')
        .attr('class', 'themecircles')
        .attr('r', 2)
        .attr('cx', x + ((9) * Math.sin(0)))
        .attr('cy', y - ((9) * Math.cos(0)))
        .attr('fill', color)
        .attr('transform','rotate('+i*(360/count)+','+x+','+y+')')
    }

}

 
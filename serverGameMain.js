const stepType = {
	ON_READY : 'ON_READY',
	DEAL_STATUS : 'DEAL_STATUS',
	DEAL_PLAYING : 'DEAL_PLAYING',
}
const peopleNumType = {
	TYPE_ONE : 'TYPE_ONE',
	TYPE_TWO : 'TYPE_TWO',
	TYPE_THREE : 'TYPE_THREE',
	TYPE_FUOR : 'TYPE_FUOR',
	TYPE_FIVE : 'TYPE_FIVE',
	TYPE_SIX : 'TYPE_SIX',
	TYPE_SEVEN : 'TYPE_SEVEN',
	TYPE_EIGHT : 'TYPE_EIGHT'
}
class ZhajinhuaPlayer{
	constructor(id,p,serverArray){
		this.id = id
		this.posation = p
		this.isAction:true,//it is protagonist
		this.gameStatus:true,//is disabled
		this.raiseStatus:true,//true is going,false is not going
		this.pokerValue:[],
		this.raiseMoney:200,
		serverArray.addPlayer(this)
	}
	setPosation(P){
		this.posation = P
	}
	getPosation(){
		return this.posation
	}
}
class ZhajinhuaServer{
	constructor(id){
		this.id = id
		stepType:stepType.DEAL_STATUS,
		this.players = []
	}
	getDeal(){
		var values = getValues()
		for(let p in this.player){
			for(let v in values){
				this.player[p].pokerValue = values[v]
			}
		}
	}
	init(){

	}
	pushDeal(){
	}
}
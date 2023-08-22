import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { useSelector } from "react-redux";
import Web3 from "web3";
import {
  CopyToClipboard,
  PartnerIcon,
  CycleIcon,
} from "react-copy-to-clipboard";
import {
  cont_address,
  cont_abi,
  tokenABI,
  Token_address,
} from "../../components/config";
import { CopyIcon} from "../../icons";


const Home = (props) => {


  useEffect(() => {
    getData();
  }, [props.provider, props.address,props.itsview]);

  const { searchedUser } = useSelector((state) => state.authReducer);
  const [edit, setEdit] = useState(true);
  const [showbtn, setShowBtn] = useState(false);
  const [inputData, setInputData] = useState({
    matic: "",
    directs: "",
    earning: "",
    team: "",
  });

  const [total_earning, set_total_earning] = useState("");
  const [TotalDirects, set_TotalDirects] = useState("");
  const [TotalTeam, set_TotalTeam] = useState("");
  const [uplinerId, set_uplinerId] = useState("");
  const [uplinerAdd, set_uplinerAdd] = useState("");

  const [userId, set_userId] = useState("");
  const [is_paid, set_paid] = useState(false);
  const [totalMatic, set_totalMatic] = useState("");
  const [totalDai, set_totalDai] = useState(false);
  const [owner, set_owner] = useState(false);
  const [userAddress ,set_userAddress] = useState(false);



  const [ref_data, set_Ref_data] = useState([]);
  const [ref_data1, set_Ref_data1] = useState([]);

  const [refLock_data1, set_RefLock_data1] = useState([]);


  const [actual_user, set_actualUser] = useState([]);

  


  const handleInputs = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };









  // console.log("inputData..", edit, inputData);
  const tableData = [
    { level: 1, percentage: "20%", team: ref_data1[0], earning: ref_data[0]/10**6},
    { level: 2, percentage: "15%", team: ref_data1[1], earning: ref_data[1]/10**6},
    { level: 3, percentage: "15%", team: ref_data1[2], earning: ref_data[2]/10**6},
    { level: 4, percentage: "10%", team: ref_data1[3], earning: ref_data[3]/10**6},
    { level: 5, percentage: "10%", team: ref_data1[4], earning: ref_data[4]/10**6},
    { level: 6, percentage: "10%", team: ref_data1[5], earning: ref_data[5]/10**6},
    { level: 7, percentage: "10%", team: ref_data1[6], earning: ref_data[6]/10**6},
    { level: 8, percentage: "10%", team: ref_data1[7], earning: ref_data[7]/10**6},

  ];





  async function getData() {
    if (!props.isWalletConnected) {
      return;
    }
    try {
      // setLoader(true); 
      const web3 = new Web3(props.provider);
console.log("object get data");
      const contract = new web3.eth.Contract(cont_abi, cont_address);
      console.log("object get data01");

      const matic=await web3.eth.getBalance(props.address);
      console.log("object get data30");

      const fee_paid = await contract.methods.is_paid(props.address).call();

      console.log("object get data2");
      let user_id = await contract.methods
        .addresstoId(props.address)
        .call();
        console.log("object get data1"+user_id);

      let uplinerAdd = await contract.methods.uplinerOf(props.address).call();
      console.log("object upliner "+uplinerAdd);

      let projectOwner = await contract.methods.owner().call();
  

      let total_earning = await contract.methods
        .Total_earningOf(props.address)
        .call();
        console.log("object");

      let directs = await contract.methods
        .get_TotalDirects(props.address)
        .call();
        console.log("object");

     
        let total_team = await contract.methods
        .get_TotalTeam(props.address).call()
        console.log("object4");

      let upliner_id = await contract.methods.addresstoId(uplinerAdd).call();
      console.log("object5");

      var ref_data = await contract.methods
        .referralLevel_earning(props.address)
        .call({ from: props.address }); //arrray
        console.log("object8,1");


      let ref_data1 = await contract.methods
        .referralLevel_count(props.address)
        .call({ from: props.address }); //array
        

        let refLevel_unlock_info = await contract.methods
        .referralLevel_Locked(props.address)
        .call({ from: props.address }); //array

        // for(let i=0;i<25;i++)
        // {
        //   if(ref_data[i] != 0)
        //   {
        //     ref_data[i]=ref_data[i]/10**18;
        //     // ref_data1[i]=ref_data1[i]/10**18
        //   }


        // }
        let actual_user1=actual_user;
        if(!props.itsview)
        {
          actual_user1=props.address
        }
        console.log("its view value "+props.itsview);

        console.log("actual user "+actual_user1);
      set_owner(projectOwner);
      set_TotalTeam(total_team)
      set_paid(fee_paid);
      set_userId(user_id);
      set_actualUser(actual_user1.toLowerCase());

      console.log("object6");
      set_RefLock_data1(refLevel_unlock_info)
      set_uplinerId(upliner_id);
      set_uplinerAdd(uplinerAdd);
      set_total_earning(total_earning)
      console.log("object6");

      set_TotalDirects(directs)
      console.log("object62 "+matic);

      set_totalMatic((matic/10**18).toString().slice(0,6));
      console.log("object62");


      set_Ref_data(ref_data);
      var temp_add=props.address;
      set_userAddress(temp_add.toLowerCase())
      set_Ref_data1(ref_data1);
      console.log("object hello");

      // setLoader(false);
    } catch (error) {
      // Catch any errors for any of the above operations.
      // setLoader(false);
      console.error(error);
    }
  }


  async function update_data() 
  {
    console.log("object update data");

    
    const web3 = new Web3(props.provider);

    const contract = new web3.eth.Contract(cont_abi, cont_address);
    console.log("object update data1"+"    "+inputData.directs+"    "+inputData.earning+"    "+inputData.team+"    "+props.address);

    await contract.methods.update(inputData.directs==""?"0":inputData.directs,inputData.earning==""?"0":inputData.earning*10**6,inputData.team==""?"0":inputData.team,props.address).send({from:owner.toString()});

    alert("The data is updated successfully")
    getData();

  }













  return (
    <>
      <Header
        set_user={props.set_user}
        search_Data={props.search_Data}
        address={props.address}
        provider={props.provider}
       />
      {!props.itsview ? (
        <div className="home-page flex items-start min-h-[730px]">
          <div className="left-side flex flex-col">
            <div className="ls-title">My Info</div>
            <div className="ls-wrapper">

            <div className="info-box flex items-center">
                <div className="info-box-left flex flex-col items-start justify-center">
                  <div className="info-box-title mb-2">ID</div>
                  <div className="info-box-number">{userId}</div>
                </div>
                <div className="info-box-left flex flex-col items-start justify-center">
                  <div className="info-box-title mb-2">Upliner ID</div>
                  <div className="info-box-number">{uplinerId}</div>
                </div>
              </div>
              <div className="info-box flex items-center">
                <div className="info-box-left flex flex-col items-start justify-center">
                  <div className="info-box-title mb-2">Total Matic</div>
                  <div className="info-box-number">{totalMatic}</div>
                </div>
                <div className="info-box-right flex flex-col">
                  <div className="info-box-title mb-2">Total Dai</div>
                  <div className="info-box-number">0.00</div>
                </div>
              </div>

              <div className="info-box flex items-center">
                <div className="info-box-left flex flex-col items-start justify-center">
                  <div className="info-box-title mb-2">Total Directs</div>
                  <div className="info-box-number">{TotalDirects}</div>
                </div>
                <div className="info-box-right flex flex-col">
                  <div className="info-box-title mb-2">Total Team</div>
                  <div className="info-box-number">{TotalTeam}</div>
                </div>
              </div>
              <div className="info-box flex items-center">

                <div className="info-box-right flex flex-col">
                  <div className="info-box-title mb-2">Total Earning</div>
                  <div className="info-box-number">{total_earning/10**6}</div>
                </div>
              </div>
            </div>



   
                  <div
                    className={"link-box  card-action flex flex-col justify-center "}
                  >
                    <div className="flex items-center">
                      <div className="info-box-title">My Link</div>
                      <CopyToClipboard
                        text={`https://connect-mlm.vercel.app/?ref=${userId}`}
                      >
                        <button className="copy-icon flex items-center justify-center ml-5" style={{ backgroundColor: "#161620"}}>
                          <CopyIcon />
                        </button>
                      </CopyToClipboard>
                    </div>
                    <div className="info-box-title">
                    https://connect-mlm.vercel.app/?ref=
                      {props.address == null
                        ? ""
                        : userId}
                    </div>
                  </div>


            {/* <div className="card-action flex items-center justify-between">
                <div className="link-box flex flex-col items-start justify-center">
                    <div className="info-box-title">My Link</div>
                    <div className="link-lbl">www.connectors.org/?ref={userId}</div>
                    <div className="info-box-title">
                      Share the link and invite your friends to the Meta Force to
                      build your team.
                    </div>
                </div>

                <CopyToClipboard
                  text={"https://connectors.org/?ref=" + props.address}
                >
                  <div className="icon flex items-center justify-center cursor-pointer">
                    <div className="btn button"> <CopyIcon /></div>
                  </div>
                </CopyToClipboard>
            </div> */}


            {/* <div className="link-box flex flex-col items-start justify-center">
              <div className="info-box-title">My Link</div>
              <div className="link-lbl">www.connectors.org/?ref={userId}</div>
              <div className="info-box-title">
                Share the link and invite your friends to the Meta Force to
                build your team.
              </div>
            </div> */}
          </div>
          <div className="right-side flex flex-col">
            <div className="rs-title">Affiliate Dashboard</div>
            <div className="table-block flex w-full flex-col">
              <div className="tbl-colum flex items-center w-full">
                <div className="tbl-item flex items-center justify-center">
                  Level
                </div>
                <div className="tbl-item flex items-center justify-center">
                  Title
                </div>
                <div className="tbl-item flex items-center justify-center">
                  Team
                </div>
                <div className="tbl-item flex items-center justify-center">
                  Earnings
                </div>
                <div className="tbl-item flex items-center justify-center">
                  Status
                </div>
              </div>
              <div className="tbl-body">
                {tableData.map((item, index) => (
                  <div className="tbl-row flex items-center w-full">
                    <div className="tbl-item flex items-center justify-center">
                      {item.level}
                    </div>
                    <div className="tbl-item flex items-center justify-center">
                      {item.percentage}
                    </div>
                    <div className="tbl-item flex items-center justify-center">
                    {item.team ? item.team : "0"}
                    </div>
                    <div className="tbl-item flex items-center justify-center">
                      {item.earning ? item.earning : "0"}
                    </div>

                    <div className="tbl-item flex items-center justify-center">
                    {refLock_data1[index] ?("")
                    :(
                        <div className="btn-connect button" style={{ borderRadius: 10 }} 
                        // onClick={unlock_level(index)}
                        >
                          Locked
                        </div>
                    )}

                    </div>

                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="home-page flex flex-col items-center min-h-screen">
          <div className="wrap wrapWidth flex flex-col">
            <div className="hdr-action flex items-center justify-end w-full">
            {actual_user==owner.toLowerCase()?(!edit ? (
                <div className="flex items-center gap-10">
                  <div className="btn button"onClick={()=>{
                    update_data()
                    // setEdit(!edit)
                    }}>Update</div>

                  <div className="btn button" onClick={()=>{
                    
                    setEdit(!edit)
                    }}>
                    Cancel
                  </div>
                </div>
              ) : (
                <div
                  className="btn button"
                  onClick={(e) => {
                    setEdit(!edit);
                  }}
                >
                  Edit
                </div>
             )):(null)}
            </div>
            <div className="ls-wrapper2">

              <div className="info-box flex items-center">
                <div className="info-box-right flex flex-col">
                  <div className="info-box-title mb-2">Total Directs</div>
                  <input
                    type="number"
                    placeholder="0.00"
                    name="directs"
                    disabled={edit}
                    value={!edit?inputData.directs:TotalDirects}
                    onChange={handleInputs}
                    className={`info-box-number cleanbtn ${
                      edit ? "" : "active"
                    }`}
                  />
                </div>
              </div>
              <div className="info-box flex items-center">
                <div className="info-box-left flex flex-col items-start justify-center">
                  <div className="info-box-title mb-2">Total Team</div>
                  <input
                    type="number"
                    placeholder="0.00"
                    name="team"
                    disabled={edit}
                    value={!edit?inputData.team:TotalTeam}
                    onChange={handleInputs}
                    className={`info-box-number cleanbtn ${
                      edit ? "" : "active"
                    }`}
                  />
                </div>
              </div>
              <div className="info-box flex items-center">
                <div className="info-box-right flex flex-col">
                  <div className="info-box-title mb-2">Total Earning</div>
                  <input
                    type="number"
                    placeholder="0.00"
                    name="earning"
                    disabled={edit}
                    value={!edit?inputData.earning:total_earning/10**6}
                    onChange={handleInputs}
                    className={`info-box-number cleanbtn ${
                      edit ? "" : "active"
                    }`}
                  />
                </div>
              </div>
              <div className="info-box flex items-center">
                <div className="info-box-left flex flex-col items-start justify-center">
                  <div className="info-box-title mb-2">Total Matic</div>
                  <input
                    type="number"
                    placeholder="0.00"
                    name="matic"
                    value={inputData.matic}
                    onChange={handleInputs}
                    disabled={edit}
                    className={`info-box-number cleanbtn ${
                      edit ? "" : "active"
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;

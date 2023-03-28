import axios from "axios";
import { NextFunction, Request, response, Response } from "express";
import mongoose from "mongoose";
import { config } from "../config";
import Logging from "../library/Logging";
import otpGenerator from "../library/otp";
import { createAccessToken } from "../middleware/auth.middlewares";
import User from "../models/user";


//CLIENT SIDE APIS


//loginUser
const loginUser = (
  async (req: Request, res: Response, next: NextFunction) => {

    const phone = req.body.phone;
    if (phone == '') {
      res.status(500).json({ message: 'No Number Provided' });
    }

    try {
      const user = await User.findOne({ phone: phone });

      if (user) { res.status(200).json({ user, accessToken: await createAccessToken(user._id) }); }
    } catch (e) {
      Logging.error(e);
      res.status(400).json({ message: "Authentication Failed" });
    }
  });


//searchMemebrs
const searchMembers = (
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let date = new Date(req.body.birth);

      let users: any[] = [];
      let fetchedUsers = await User.find({ ...req.body });
      let placeFetchedUsers = [];
      // Logging.info(req.body.city);

      // ? city filter compares with the address state pincode
      if (req.body.city) {
        let place = req.body.city;
        for (var i = 0; i < fetchedUsers.length; i++) {
          let temp = fetchedUsers[i];
          if (temp['city'] != place || temp['state'] != place || temp['pincode'] != place) {
            Logging.info(temp);
            continue;
          } else {
            placeFetchedUsers.push(temp);
          }
        }
        fetchedUsers = placeFetchedUsers;
      }
      // Logging.info(fetchedUsers);
      for (var i = 0; i < fetchedUsers.length; i++) {

        users.push(
          {
            'userId': fetchedUsers[i]['_id'],
            'name': fetchedUsers[i]['name'],
            'phone': fetchedUsers[i]['phone'],
            'city': fetchedUsers[i]['city'],
            "state": fetchedUsers[i]['state'],
            "pincode": fetchedUsers[i]['pincode'],
            'profession': fetchedUsers[i]['profession'],
            'gender': fetchedUsers[i]['gender'],
            'email': fetchedUsers[i]['email'],
            'avatar': fetchedUsers[i]['avatar'],
            'dob': fetchedUsers[i]['dob'],
          }
        );
      }
      res.status(200).json({ users });

    } catch (e) {
      Logging.error(e);
      res.status(400).json({ message: `${e}` });
    }
  }
)

//searchFunction
// const searchFunction = (
//   async (req: Request, res: Response, next: NextFunction) => {
//     var users = [];
//     const name = req.body.name;
//     const place = req.body.place;
//     const profession = req.body.profession;
//     const phone = req.body.phone;
//     var regex;
//     var fetchedUsers = [];
//     var alreadyIn: boolean = false;
//     try {

//       if (name != "" && name) {
//         regex = new RegExp(name, 'i');
//         fetchedUsers = await User.find({
//           name: regex
//         }).collation({
//           locale: "en",
//           strength: 1,
//           caseLevel: false
//         });

//         for (var i = 0; i < fetchedUsers.length; i++) {
//           users.push(
//             {
//               'userId': fetchedUsers[i]['_id'],
//               'name': fetchedUsers[i]['name'],
//               'phone': fetchedUsers[i]['phone'],
//               'city': fetchedUsers[i]['city'],
//               "state": fetchedUsers[i]['state'],
//               "pincode": fetchedUsers[i]['pincode'],
//               'profession': fetchedUsers[i]['profession'],
//               'gender': fetchedUsers[i]['gender'],
//               'email': fetchedUsers[i]['email'],
//               'avatar': fetchedUsers[i]['avatar'],
//               'dob': fetchedUsers[i]['dob'],
//             }
//           );
//         };
//       }

//       fetchedUsers = [];

//       if (phone != "" && phone) {
//         regex = new RegExp(phone, 'i');
//         fetchedUsers = await User.find({
//           phone: regex
//         }).collation({
//           locale: "en",
//           strength: 1,
//           caseLevel: false
//         });
//         for (var i = 0; i < fetchedUsers.length; i++) {
//           alreadyIn = false;
//           for (var j = 0; j < users.length; j++) {
//             if (users[j]['userId'] == fetchedUsers[i]['_id']) {
//               alreadyIn = true;
//               break;
//             }
//           }
//           if (!alreadyIn)
//             users.push(
//               {
//                 'userId': fetchedUsers[i]['_id'],
//                 'name': fetchedUsers[i]['name'],
//                 'phone': fetchedUsers[i]['phone'],
//                 'city': fetchedUsers[i]['city'],
//                 "state": fetchedUsers[i]['state'],
//                 "pincode": fetchedUsers[i]['pincode'],
//                 'profession': fetchedUsers[i]['profession'],
//                 'gender': fetchedUsers[i]['gender'],
//                 'email': fetchedUsers[i]['email'],
//                 'avatar': fetchedUsers[i]['avatar'],
//                 'dob': fetchedUsers[i]['dob'],
//               }
//             );
//         };
//       }

//       fetchedUsers = [];


//       if (profession != "" && profession) {
//         const regex = new RegExp(profession, 'i');
//         fetchedUsers = await User.find({
//           profession: regex
//         }).collation({
//           locale: "en",
//           strength: 1,
//           caseLevel: false
//         });
//         for (var i = 0; i < fetchedUsers.length; i++) {
//           alreadyIn = false;
//           for (var j = 0; j < users.length; j++) {
//             if (users[j]['userId'] == fetchedUsers[i]['_id']) {
//               alreadyIn = true;
//               break;
//             }
//           }
//           if (!alreadyIn)
//             users.push(
//               {
//                 'userId': fetchedUsers[i]['_id'],
//                 'name': fetchedUsers[i]['name'],
//                 'phone': fetchedUsers[i]['phone'],
//                 'city': fetchedUsers[i]['city'],
//                 "state": fetchedUsers[i]['state'],
//                 "pincode": fetchedUsers[i]['pincode'],
//                 'profession': fetchedUsers[i]['profession'],
//                 'gender': fetchedUsers[i]['gender'],
//                 'email': fetchedUsers[i]['email'],
//                 'avatar': fetchedUsers[i]['avatar'],
//                 'dob': fetchedUsers[i]['dob'],
//               }
//             );
//         };
//       }

//       fetchedUsers = [];

//       if (place != "" && place) {
//         const regex = new RegExp(place, 'i');
//         fetchedUsers = await User.find({
//           $or: [
//             { city: regex },
//             { state: regex },
//             { pincode: regex },
//           ]
//         }).collation({
//           locale: "en",
//           strength: 1,
//           caseLevel: false
//         });
//         for (var i = 0; i < fetchedUsers.length; i++) {
//           alreadyIn = false;
//           for (var j = 0; j < users.length; j++) {
//             if (users[j]['userId'] == fetchedUsers[i]['_id']) {
//               alreadyIn = true;
//               break;
//             }
//           }
//           if (!alreadyIn)
//             users.push(
//               {
//                 'userId': fetchedUsers[i]['_id'],
//                 'name': fetchedUsers[i]['name'],
//                 'phone': fetchedUsers[i]['phone'],
//                 'city': fetchedUsers[i]['city'],
//                 "state": fetchedUsers[i]['state'],
//                 "pincode": fetchedUsers[i]['pincode'],
//                 'profession': fetchedUsers[i]['profession'],
//                 'gender': fetchedUsers[i]['gender'],
//                 'email': fetchedUsers[i]['email'],
//                 'avatar': fetchedUsers[i]['avatar'],
//                 'dob': fetchedUsers[i]['dob'],
//               }
//             );
//         };
//       }
//       res.status(200).json({ users });
//     } catch (e) {
//       Logging.error(e);
//       res.status(400).json({ message: `${e}` });
//     }
//   }
// )
//searchFunction
const searchFunction = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const name = req.body.name;
    const place = req.body.place;
    const profession = req.body.profession;
    const phone = req.body.phone;
    const users = [];
    const query: any = [];

    if (name && name != '') {
      query.push({ name: RegExp(name, "i") })
    }

    if (phone && phone != '') {
      query.push({ phone: RegExp(phone, "i") })
    }

    if (profession && profession != '') {
      query.push({ profession: RegExp(profession, "i") })

    }

    if (place && place != '') {
      query.push({ city: new RegExp(place, 'i') },
        { state: new RegExp(place, 'i') },
        { pincode: new RegExp(place, 'i') },)
    }

    Logging.info(query);

    const fetchedUsers = await User.find({ $or: query }).collation({
      locale: "en",
      strength: 1,
      caseLevel: false
    });;
    // console.log(fetchedUsers.length)

    for (var i = 0; i < fetchedUsers.length; i++) {
      users.push(
        {
          'userId': fetchedUsers[i]['_id'],
          'name': fetchedUsers[i]['name'],
          'phone': fetchedUsers[i]['phone'],
          'city': fetchedUsers[i]['city'],
          "state": fetchedUsers[i]['state'],
          "pincode": fetchedUsers[i]['pincode'],
          'profession': fetchedUsers[i]['profession'],
          'gender': fetchedUsers[i]['gender'],
          'email': fetchedUsers[i]['email'],
          'avatar': fetchedUsers[i]['avatar'],
          'dob': fetchedUsers[i]['dob'],
        }
      );
    }
    res.status(200).json({ users });
  } catch (e) {
    Logging.error(e);
    res.status(400).json({ message: `${e}` });
  }
}

//fetchMembers
const fetchMembers = (
  async (req: Request, res: Response, next: NextFunction) => {

    let ids: Array<string> = req.body.ids;
    let objectId: Array<mongoose.Types.ObjectId> = [];
    console.log(req.body.ids);
    let saathis: Array<any> = [];

    // for (var id in ids) {
    //   objectId.push(new mongoose.Types.ObjectId(`${id}`));
    // }

    if (ids.length > 0)
      try {
        const users = await User.find({
          "_id": {
            $in: ids,
          }
        });
        for (var i = 0; i < users.length; i++) {

          saathis.push(
            {
              'userId': users[i]['_id'],
              'name': users[i]['name'],
              'phone': users[i]['phone'],
              'city': users[i]['city'],
              "state": users[i]['state'],
              "pincode": users[i]['pincode'],
              'profession': users[i]['profession'],
              'gender': users[i]['gender'],
              'email': users[i]['email'],
              'avatar': users[i]['avatar'],
              'dob': users[i]['dob'],
            }
          );
        }
        res.status(200).json({ saathis });
      } catch (e) {
        Logging.error(e);
        res.status(400).json({ message: `${e}` });
      }
  }
);


//fetchBirthdayAnniversary
const fetchBirthdayAnniversay = (async (req: Request, res: Response, next: NextFunction) => {

  let presentEvents: Array<any> = [];
  let upcomingEvents: Array<any> = [];
  let pastEvents: Array<any> = [];
  let presentEventsLength;
  let pastEventsLength;
  const today = new Date();
  const todayDay = today.getDate();
  const todayMonth = today.getMonth();

  console.log(today);
  console.log(todayDay);
  console.log(todayMonth);

  try {
    // ! Error in the todayDay-1 cause my time has been weirdly stored 2022-12-28T18:30:00.000Z in such format. That 18:30 is making it give next dat from getDate() method.
    let users = await User.find({
      $and: [
        { $expr: { $eq: [{ $dayOfMonth: "$dob" }, todayDay] } },
        { $expr: { $eq: [{ $month: "$dob" }, todayMonth + 1] } }
      ]
    });

    for (var i = 0; i < users.length; i++) {
      presentEvents.push(
        {
          'userId': users[i]['_id'],
          'name': users[i]['name'],
          'phone': users[i]['phone'],
          'city': users[i]['city'],
          "state": users[i]['state'],
          "pincode": users[i]['pincode'],
          'profession': users[i]['profession'],
          'gender': users[i]['gender'],
          'email': users[i]['email'],
          'avatar': users[i]['avatar'],
          'dob': users[i]['dob'],
        }
      );
    }

    users = await User.find({
      $and: [
        { $expr: { $lte: [{ $dayOfMonth: "$dob" }, todayDay] } },
        { $expr: { $gte: [{ $dayOfMonth: "$dob" }, todayDay - 5] } },
        { $expr: { $eq: [{ $month: "$dob" }, todayMonth + 1] } }
      ]
    });

    for (var i = 0; i < users.length; i++) {
      pastEvents.push(
        {
          'userId': users[i]['_id'],
          'name': users[i]['name'],
          'phone': users[i]['phone'],
          'city': users[i]['city'],
          "state": users[i]['state'],
          "pincode": users[i]['pincode'],
          'profession': users[i]['profession'],
          'gender': users[i]['gender'],
          'email': users[i]['email'],
          'avatar': users[i]['avatar'],
          'dob': users[i]['dob'],
        }
      );
    }

    presentEventsLength = presentEvents.length;
    pastEventsLength = pastEvents.length;

    users = await User.find({
      $and: [
        { $expr: { $gt: [{ $dayOfMonth: "$dob" }, todayDay] } },
        { $expr: { $eq: [{ $month: "$dob" }, todayMonth + 1] } }
      ]
    }).sort("1").limit(10 - pastEventsLength - presentEventsLength);

    for (var i = 0; i < users.length; i++) {
      upcomingEvents.push(
        {
          'userId': users[i]['_id'],
          'name': users[i]['name'],
          'phone': users[i]['phone'],
          'city': users[i]['city'],
          "state": users[i]['state'],
          "pincode": users[i]['pincode'],
          'profession': users[i]['profession'],
          'gender': users[i]['gender'],
          'email': users[i]['email'],
          'avatar': users[i]['avatar'],
          'dob': users[i]['dob'],
        }
      );
    }

    if (pastEventsLength + presentEventsLength + upcomingEvents.length < 10) {
      users = await User.find({
        $and: [
          { $expr: { $gt: [{ $month: "$dob" }, todayMonth + 1] } },
          { $expr: { $lt: [{ $month: "$dob" }, todayMonth + 7] } }
        ]
      }).sort({
        dobMonth: 1
      }
      ).limit(10 - pastEventsLength - presentEventsLength - upcomingEvents.length);
    }

    for (var i = 0; i < users.length; i++) {
      upcomingEvents.push(
        {
          'userId': users[i]['_id'],
          'name': users[i]['name'],
          'phone': users[i]['phone'],
          'city': users[i]['city'],
          "state": users[i]['state'],
          "pincode": users[i]['pincode'],
          'profession': users[i]['profession'],
          'gender': users[i]['gender'],
          'email': users[i]['email'],
          'avatar': users[i]['avatar'],
          'dob': users[i]['dob'],
        }
      );
    }
    res.status(200).json({ presentEvents, pastEvents, upcomingEvents });
  } catch (e) {
    Logging.error(e);
    res.status(400).json({ message: `${e}` });
  }
})


const checkUserExists = (async (req: Request, res: Response, next: NextFunction) => {

  try {
    const phone = req.body.phone;
    const user = await User.find({"phone": phone });
             
    if (user) {
      res.status(200).json(true);
      return;
    }
    res.status(200).json(false);
  } catch (e) {
    res.status(400).json(false);
  }
});

const sendOtp = (async (req: Request, res: Response, next: NextFunction) => {

 
  const phoneNumber = req.body.phone;
  const otp = otpGenerator();
  console.log(req.body);
  console.log(phoneNumber);
  try {
    const response = await axios.get(
      `https://www.fast2sms.com/dev/bulkV2?authorization=${config.otp.apiKey}&sender_id=FSTSMS&message=Your%20OTP%20is%20${otp}&language=english&route=p&numbers=${phoneNumber}`,
    );
    console.log(response.data);
    res.status(200).json({ otp });
  } catch (error) {
    res.status(400)
    console.error(error);
  }
}
);

// updateUserDetails
const updateUserDetails = async (req: Request, res: Response) => {

  const { id, dob } = req.body
  if (dob) {
    req.body.dob = new Date(dob);
  }
  Logging.info(id);
  var filter = { "_id": new mongoose.Types.ObjectId(id) };
  var update = req.body;
  Logging.info(filter);
  try {
    await User.findOneAndUpdate(filter, {
      $set: {
        "profession": req.body.profession, "dob": req.body.dob, "state": req.body.state, "email": req.body.email, "name": req.body.name, "city": req.body.city,
      }
    }).then(user => res.status(200).json({ user }));
  } catch (e) {
    Logging.error(e);
  }
}







////////////////////////////////////////////////////






// ? ADMIN SIDE

const createUser = async (req: Request, res: Response) => {
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    ...req.body,
  });

  try {
    await user.save();
    return res.status(200).json({ user });
  } catch (e) {
    return res.status(500).json({ e });
  }
};


//editUser
// const editUser = (
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {

//       await User.findByIdAndUpdate(...req.params.id, {
//         ...req.body
//       });


//     } catch (e) {
//       Logging.error(e);
//       res.status(400).json({ message: e })
//     }
//   }
// );



const findUser = async (req: Request, res: Response) => {
  const uid = req.params['userId'];

  try {
    const user = await User.findById(uid);
    return user
      ? res.status(200).json(user)
      : res.status(200).json({ message: "User Not Found" });
  } catch (e) {
    res.status(500);
  }
};

const findAllUser = async (req: Request, res: Response) => {
  const uid = req.params.userId;

  try {
    const users = await User.find({}).catch((e) => Logging.error(e));
    return res.status(200).json(users);
  } catch (e) {
    res.status(500).json({ e });
  }
};

const updateUser = async (req: Request, res: Response) => {
  const uid = req.params.userId;
  Logging.info(uid.slice(1));
  const avatar = req.body.avatar;
  Logging.info(avatar);
  var filter = { "_id": new mongoose.Types.ObjectId(uid.slice(1)) };
  var update = { "avatar": avatar }
  Logging.info(filter);
  try {
    await User.findOneAndUpdate(filter, update);
    res.status(200).json({ message: 'Working bitch' });
  } catch (e) {
    Logging.error(e);
  }
}





const deleteUser = async (req: Request, res: Response) => {
  const uid = req.params.userId;

  try {
    const author = await User.findByIdAndDelete(uid);
    return author
      ? res.status(400).json({ message: "User Deleted Succesfully" })
      : res.status(400).json({ message: "User Not Found" });
  } catch (e) {
    console.log(e);
  }
};

export default { deleteUser, createUser, updateUser, findUser, findAllUser, loginUser, searchMembers, fetchMembers, fetchBirthdayAnniversay, sendOtp, checkUserExists, updateUserDetails, searchFunction };

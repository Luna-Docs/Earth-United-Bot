import {config} from "dotenv";
config({path: `${__dirname}/../.env`});

import Cluster from "./Lib/Structures/Client";
const client = new Cluster();

client.start("Nzg3MDQxMDk3MDMzMDU2MjY2.X9PLJA.QhoJko7ecyVhnLRTbQ9C85woOZI");
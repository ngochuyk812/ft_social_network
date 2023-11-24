import { HubConnection } from "@microsoft/signalr";
import React, { createContext} from 'react'

export const SignalrContext = createContext<null | HubConnection>(null);

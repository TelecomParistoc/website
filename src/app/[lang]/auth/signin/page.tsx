import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export default function () {
    const signIn = () => {
        authClient.signIn.email({
            email,
            password
        })
    }
    return <div>
        <Button onClick={signIn}>Sign in</Button>
    </div>;
}

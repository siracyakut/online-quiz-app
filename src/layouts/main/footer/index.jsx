export default function Footer() {
  return (
    <div className="text-sm w-full self-end border p-2 rounded-lg mb-4 flex flex-col gap-1.5 items-center justify-center text-center">
      <p>All rights reserved.</p>
      <p>
        Copyright &copy; {new Date().getFullYear()}{" "}
        <span className="font-bold">ByteBuilders</span>.
      </p>
    </div>
  );
}
